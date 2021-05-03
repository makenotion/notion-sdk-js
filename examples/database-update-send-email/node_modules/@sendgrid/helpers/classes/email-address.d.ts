export type EmailData = string|{ name?: string; email: string; }

export type EmailJSON = { name?: string; email: string }

export default class EmailAddress {
  constructor(data?: EmailData);

  /**
   * From data
   */
  fromData(data: EmailData): void;

  /**
   * Set name
   */
  setName(name: string): void;

  /**
   * Set email (mandatory)
   */
  setEmail(email: string): void;

  toJSON(): EmailJSON;
}