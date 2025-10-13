# Automatización de Gmail a Notion

Este proyecto contiene un script de Python para conectar tu bandeja de entrada de Gmail con una base de datos de Notion. La automatización busca correos electrónicos no leídos, los guarda como nuevos elementos en una base de datos de Notion y establece un recordatorio para una fecha y hora específicas.

## Requisitos Previos

- Python 3.7 o superior.
- Una cuenta de Google (Gmail).
- Una cuenta de Notion.

## Pasos de Configuración

Sigue estos pasos cuidadosamente para configurar la automatización.

### Paso 1: Configurar el Entorno de Python

1.  **Crea un entorno virtual:**
    ```bash
    python -m venv venv
    ```

2.  **Activa el entorno virtual:**
    -   En Windows:
        ```bash
        venv\\Scripts\\activate
        ```
    -   En macOS y Linux:
        ```bash
        source venv/bin/activate
        ```

3.  **Instala las dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

### Paso 2: Obtener Credenciales de la API de Google

Para leer tu bandeja de entrada de Gmail, necesitas habilitar la API de Gmail y obtener un archivo de credenciales.

1.  **Ve a la [Consola de APIs de Google](https://console.cloud.google.com/apis/dashboard)**.
2.  Crea un nuevo proyecto o selecciona uno existente.
3.  En el menú de navegación, ve a **APIs y servicios > Biblioteca**.
4.  Busca "Gmail API" y actívala.
5.  Vuelve a **APIs y servicios > Credenciales**.
6.  Haz clic en **Crear credenciales > ID de cliente de OAuth**.
7.  Si se te solicita, configura la pantalla de consentimiento. Selecciona **Externo** y proporciona un nombre para la aplicación, tu correo electrónico de soporte y la información de contacto del desarrollador. No necesitas agregar ámbitos ni usuarios de prueba por ahora.
8.  En la creación del ID de cliente, selecciona **Aplicación de escritorio**.
9.  Haz clic en **Crear**. Se mostrará tu ID y secreto de cliente.
10. **Descarga el archivo JSON**. Renombra este archivo a `credentials.json` y colócalo en la misma carpeta que el script (`gmail_notion_automation`).

### Paso 3: Obtener Credenciales de Notion

1.  **Crea una nueva integración:**
    -   Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations).
    -   Haz clic en **+ Nueva integración**.
    -   Dale un nombre (por ejemplo, "Automatización Gmail").
    -   Asegúrate de que la capacidad de "Insertar contenido" esté habilitada.
    -   Guarda los cambios.

2.  **Copia tu "Secreto de integración interna"**. Este es tu `NOTION_API_KEY`.

### Paso 4: Crear y Configurar la Base de Datos de Notion

1.  Crea una nueva página en Notion y elige la vista de **Base de datos - Página completa**.
2.  Dale un nombre a tu base de datos (por ejemplo, "Correos de Gmail").
3.  La base de datos debe tener las siguientes propiedades **exactamente** como se describe:
    -   **Asunto** (Propiedad de tipo `Título`, ya viene por defecto).
    -   **Fecha de Recordatorio** (Propiedad de tipo `Fecha`).

4.  **Obtén el ID de la base de datos:**
    -   Abre la base de datos en Notion.
    -   La URL tendrá un formato como `https://www.notion.so/tu-workspace/DATABASE_ID?v=...`.
    -   Copia la parte `DATABASE_ID`. Es una cadena de caracteres alfanuméricos.

5.  **Conecta tu integración a la base de datos:**
    -   En tu base de datos de Notion, haz clic en los tres puntos (`...`) en la esquina superior derecha.
    -   Haz clic en **+ Añadir conexiones**.
    -   Busca y selecciona la integración que creaste en el paso anterior.

### Paso 5: Configurar el Script

Abre el archivo `gmail_to_notion.py` y edita las siguientes variables en la sección de `CONFIGURACIÓN`:

-   `NOTION_API_KEY`: Pega aquí tu Secreto de integración interna de Notion.
-   `NOTION_DATABASE_ID`: Pega aquí el ID de tu base de datos de Notion.
-   `REMINDER_DAY`: El día de la semana para el recordatorio (en inglés, por ejemplo, `"Monday"`).
-   `REMINDER_TIME`: La hora para el recordatorio en formato 24h (por ejemplo, `"09:00"`).

### Paso 6: Ejecutar el Script

1.  Asegúrate de que tu entorno virtual esté activado y de que estás en el directorio `gmail_notion_automation`.
2.  La primera vez que ejecutes el script, se abrirá una ventana en tu navegador pidiéndote que autorices el acceso a tu cuenta de Google. Sigue los pasos.
    -   **Nota:** Como la aplicación no está verificada por Google, es posible que veas una advertencia de seguridad. Deberás hacer clic en "Avanzado" y luego en "Ir a [nombre de tu app] (no seguro)".
3.  Después de la autorización, se creará un archivo `token.pickle`. Este archivo almacenará tus credenciales para futuras ejecuciones.

Ejecuta el script desde tu terminal:
```bash
python gmail_to_notion.py
```

¡Y listo! El script buscará nuevos correos y los añadirá a Notion. Puedes configurar una tarea programada (como un cron job) para ejecutar este script periódicamente.
