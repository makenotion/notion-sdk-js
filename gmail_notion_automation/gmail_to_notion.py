# -*- coding: utf-8 -*-
import os
import pickle
from datetime import datetime, timedelta
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from notion_client import Client

# --- CONFIGURACIÓN ---
# 1. Notion API Key
NOTION_API_KEY = "TU_NOTION_API_KEY"
# 2. Notion Database ID
NOTION_DATABASE_ID = "TU_NOTION_DATABASE_ID"
# 3. Día y hora para el recordatorio (formato 24h)
REMINDER_DAY = "Monday"  # Lunes
REMINDER_TIME = "09:00"

# --- Constantes de la API de Google ---
GMAIL_API_NAME = 'gmail'
GMAIL_API_VERSION = 'v1'
GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
CREDENTIALS_FILE = 'credentials.json'
TOKEN_PICKLE_FILE = 'token.pickle'

def gmail_authenticate():
    """Autentica con la API de Gmail y devuelve el servicio."""
    creds = None
    if os.path.exists(TOKEN_PICKLE_FILE):
        with open(TOKEN_PICKLE_FILE, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, GMAIL_SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_PICKLE_FILE, 'wb') as token:
            pickle.dump(creds, token)

    return build(GMAIL_API_NAME, GMAIL_API_VERSION, credentials=creds)

def fetch_new_emails(service):
    """Obtiene los correos no leídos de la bandeja de entrada."""
    # Busca solo correos no leídos
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], q="is:unread").execute()
    messages = results.get('messages', [])

    emails = []
    if not messages:
        print("No se encontraron correos nuevos.")
    else:
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            email_data = {
                'id': message['id'],
                'snippet': msg['snippet'],
                'headers': msg['payload']['headers']
            }
            emails.append(email_data)
    return emails

def get_email_subject(headers):
    """Extrae el asunto del correo."""
    for header in headers:
        if header['name'] == 'Subject':
            return header['value']
    return "Sin Asunto"

def calculate_reminder_date():
    """Calcula la próxima fecha para el día de la semana especificado."""
    today = datetime.now()
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    target_day_index = days_of_week.index(REMINDER_DAY)
    days_ahead = target_day_index - today.weekday()
    if days_ahead <= 0:  # Si el día ya pasó esta semana o es hoy, programar para la siguiente semana
        days_ahead += 7

    reminder_date = today + timedelta(days=days_ahead)
    time_parts = list(map(int, REMINDER_TIME.split(':')))
    return reminder_date.replace(hour=time_parts[0], minute=time_parts[1], second=0).isoformat()

def create_notion_page(email_data):
    """Crea una nueva página en la base de datos de Notion."""
    notion = Client(auth=NOTION_API_KEY)

    subject = get_email_subject(email_data['headers'])
    reminder_date = calculate_reminder_date()

    notion.pages.create(
        parent={"database_id": NOTION_DATABASE_ID},
        properties={
            "Asunto": {
                "title": [
                    {
                        "text": {
                            "content": subject
                        }
                    }
                ]
            },
            "Fecha de Recordatorio": {
                "date": {
                    "start": reminder_date
                }
            }
        },
        children=[
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": email_data['snippet']
                            }
                        }
                    ]
                }
            }
        ]
    )

def mark_email_as_read(service, msg_id):
    """Marca un correo como leído en Gmail."""
    service.users().messages().modify(
        userId='me',
        id=msg_id,
        body={'removeLabelIds': ['UNREAD']}
    ).execute()

def main():
    """Función principal que orquesta la automatización."""
    print("Iniciando la automatización...")
    gmail_service = gmail_authenticate()
    emails = fetch_new_emails(gmail_service)

    if not emails:
        return

    print(f"Se encontraron {len(emails)} correos nuevos. Procesando...")
    for email in emails:
        try:
            create_notion_page(email)
            mark_email_as_read(gmail_service, email['id'])
            print(f"Correo '{get_email_subject(email['headers'])}' procesado y guardado en Notion.")
        except Exception as e:
            print(f"Error al procesar el correo: {e}")

    print("Automatización completada.")

if __name__ == '__main__':
    main()
