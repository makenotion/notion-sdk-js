import {Client} from "@sendgrid/client";
import {ClientResponse} from "@sendgrid/client/src/response";
import {ResponseError} from "@sendgrid/helpers/classes";
import {MailDataRequired} from "@sendgrid/helpers/classes/mail";

declare class MailService {
  /**
   * SendGrid API key passthrough for convenience.
   */
  setApiKey(apiKey: string): void;

  /**
   * Client to use for invoking underlying API
   */
  setClient(client: Client): void;

  /**
   * Twilio Email Auth passthrough for convenience.
   */
  setTwilioEmailAuth(username: string, password: string): void;

  /**
   * Set the default request timeout (in milliseconds).
   */
  setTimeout(timeout: number): void;

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left: string, right: string): void;

  /**
   * Send email
   */
  send(data: MailDataRequired | MailDataRequired[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data: MailDataRequired, cb?: (error: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<[ClientResponse, {}]>;
}

declare const mail: MailService;
// @ts-ignore
export = mail;

export {MailService};
export {MailDataRequired};
