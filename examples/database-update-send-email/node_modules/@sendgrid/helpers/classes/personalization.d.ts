import { EmailData, EmailJSON } from "./email-address";

export interface PersonalizationData {
  to: EmailData | EmailData[],
  cc?: EmailData | EmailData[],
  bcc?: EmailData | EmailData[],
  subject?: string;
  headers?: { [key: string]: string };
  substitutions?: { [key: string]: string };
  dynamicTemplateData?: { [key: string]: any; };
  customArgs?: { [key: string]: string };
  sendAt?: number;
}

export interface PersonalizationJSON {
  to: EmailJSON | EmailJSON[];
  cc?: EmailJSON[];
  bcc?: EmailJSON[];
  headers?: { [key: string]: string; };
  substitutions?: { [key: string]: string; };
  dynamic_template_data?: { [key: string]: string; };
  custom_args?: { [key: string]: string; };
  subject?: string;
  send_at?: number;
}

export default class Personalization {
  constructor(data?: PersonalizationData);

  fromData(data: PersonalizationData): void;

  /**
   * Set subject
   */
  setSubject(subject: string): void;

  /**
   * Set send at
   */
  setSendAt(sendAt: number): void;

  /**
   * Set to
   */
  setTo(to: EmailData | EmailData[]): void;

  /**
   * Add a single to
   */
  addTo(to: EmailData): void;

  /**
   * Set cc
   */
  setCc(cc: EmailData | EmailData[]): void;

  /**
   * Add a single cc
   */
  addCc(cc: EmailData): void;

  /**
   * Set bcc
   */
  setBcc(bcc: EmailData | EmailData[]): void;

  /**
   * Add a single bcc
   */
  addBcc(bcc: EmailData): void;

  /**
   * Set headers
   */
  setHeaders(headers: { [key: string]: string }): void;

  /**
   * Add a header
   */
  addHeader(key: string, value: string): void;

  /**
   * Set custom args
   */
  setCustomArgs(customArgs: { [key: string]: string }): void;

  /**
   * Add a custom arg
   */
  addCustomArg(key: string, value: string): void;

  /**
   * Set substitutions
   */
  setSubstitutions(substitutions: { [key: string]: string }): void;

  /**
   * Add a substitution
   */
  addSubstitution(key: string, value: string): void;

  /**
   * Reverse merge substitutions, preserving existing ones
   */
  reverseMergeSubstitutions(substitutions: { [key: string]: string }): void;

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(wrappers: string[]): void;

  /**
   * Set dynamic template data
   */
  setDynamicTemplateData(dynamicTemplateData: { [key: string]: any }): void;

  /**
   * To JSON
   */
  toJSON(): PersonalizationJSON;
}