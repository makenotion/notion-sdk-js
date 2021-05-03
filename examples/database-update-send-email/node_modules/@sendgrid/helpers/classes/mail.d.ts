import {AttachmentData, AttachmentJSON} from "./attachment";
import {EmailData, EmailJSON} from "./email-address";
import Personalization from "./personalization";
import {PersonalizationData, PersonalizationJSON} from "./personalization";

export interface MailContent {
  type: string;
  value: string;
}

export interface ASMOptions {
  groupId: number;
  groupsToDisplay?: number[];
}

export interface ASMOptionsJSON {
  group_id: number;
  groups_to_display?: number[];
}

export interface MailSettings {
  bcc?: {
    enable?: boolean;
    email?: string;
  };
  bypassListManagement?: {
    enable?: boolean;
  };
  footer?: {
    enable?: boolean;
    text?: string;
    html?: string;
  };
  sandboxMode?: {
    enable?: boolean;
  };
  spamCheck?: {
    enable?: boolean;
    threshold?: number;
    postToUrl?: string;
  };
}

export interface MailSettingsJSON {
  bcc?: {
    enable?: boolean;
    email?: string;
  };
  bypass_list_management?: {
    enable?: boolean;
  };
  footer?: {
    enable?: boolean;
    text?: string;
    html?: string;
  };
  sandbox_mode?: {
    enable?: boolean;
  };
  spam_check?: {
    enable?: boolean;
    threshold?: number;
    post_to_url?: string;
  };
}

export interface TrackingSettings {
  clickTracking?: {
    enable?: boolean;
    enableText?: boolean;
  };
  openTracking?: {
    enable?: boolean;
    substitutionTag?: string;
  };
  subscriptionTracking?: {
    enable?: boolean;
    text?: string;
    html?: string;
    substitutionTag?: string;
  };
  ganalytics?: {
    enable?: boolean;
    utmSource?: string;
    utmMedium?: string;
    utmTerm?: string;
    utmContent?: string;
    utmCampaign?: string;
  };
}

export interface TrackingSettingsJSON {
  click_tracking?: {
    enable?: boolean;
    enable_text?: boolean;
  };
  open_tracking?: {
    enable?: boolean;
    substitution_tag?: string;
  };
  subscription_tracking?: {
    enable?: boolean;
    text?: string;
    html?: string;
    substitution_tag?: string;
  };
  ganalytics?: {
    enable?: boolean;
    utm_source?: string;
    utm_medium?: string;
    utm_term?: string;
    utm_content?: string;
    utm_campaign?: string;
  };
}

export interface MailData {
  to?: EmailData|EmailData[],
  cc?: EmailData|EmailData[],
  bcc?: EmailData|EmailData[],

  from: EmailData,
  replyTo?: EmailData,

  sendAt?: number,

  subject?: string,
  text?: string,
  html?: string,
  content?: MailContent[],
  templateId?: string,

  personalizations?: PersonalizationData[],
  attachments?: AttachmentData[],
  
  ipPoolName?: string,
  batchId?: string,

  sections?: { [key: string]: string },
  headers?: { [key: string]: string },
  
  categories?: string[],
  category?: string,
  
  customArgs?: { [key: string]: any },
  asm?: ASMOptions,

  mailSettings?: MailSettings,
  trackingSettings?: TrackingSettings,
  
  substitutions?: { [key: string]: string },
  substitutionWrappers?: string[],
  
  isMultiple?: boolean,
  dynamicTemplateData?: { [key: string]: any },

  hideWarnings?: boolean,
}

export type MailDataRequired = MailData & (
    { text: string } | { html: string } | { templateId: string } | { content: MailContent[] & { 0: MailContent } });

export interface MailJSON {
  from: EmailJSON;
  subject: string;
  content: MailContent[];
  personalizations: PersonalizationJSON[];
  attachments?: AttachmentJSON[];
  categories?: string[];
  headers?: { [key: string]: string };
  mail_settings?: MailSettingsJSON;
  tracking_settings?: TrackingSettingsJSON;
  custom_args?: { [key: string]: string };
  sections?: { [key: string]: string };
  asm?: ASMOptionsJSON;

  reply_to?: EmailJSON;
  send_at?: number;
  batch_id?: string;
  template_id?: string;
  ip_pool_name?: string;
}

export default class Mail {
  constructor(data?: MailData);

  /**
   * Build from data
   */
  fromData(data: MailData): void;

  /**
   * Set from email
   */
  setFrom(from: EmailData): void;

  /**
   * Set reply to
   */
  setReplyTo(replyTo: EmailData): void;

  /**
   * Set subject
   */
  setSubject(subject: string): void;

  /**
   * Set send at
   */
  setSendAt(sendAt: number): void;

  /**
   * Set template ID
   */
  setTemplateId(templateId: string): void;

  /**
   * Set batch ID
   */
  setBatchId(batchId: string): void;

  /**
   * Set IP pool name
   */
  setIpPoolName(ipPoolName: string): void;

  /**
   * Set ASM
   */
  setAsm(asm: ASMOptions): void;

  /**
   * Set personalizations
   */
  setPersonalizations(personalizations: PersonalizationData[]): void;

  /**
   * Add personalization
   */
  addPersonalization(personalization: PersonalizationData): void;

  /**
   * Convenience method for quickly creating personalizations
   */
  addTo(to: EmailData|EmailData[], cc: EmailData|EmailData[], bcc: EmailData|EmailData[]): void;

  /**
   * Set substitutions
   */
  setSubstitutions(substitutions: { [key: string]: string }): void;

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(wrappers: string[]): void;

  /**
   * Helper which applies globally set substitutions to personalizations
   */
  applySubstitutions(personalization: Personalization): void;

  /**
   * Set content
   */
  setContent(content: MailContent[]): void;

  /**
   * Add content
   */
  addContent(content: MailContent): void;

  /**
   * Add text content
   */
  addTextContent(text: string): void;

  /**
   * Add HTML content
   */
  addHtmlContent(html: string): void;

  /**
   * Set attachments
   */
  setAttachments(attachments: AttachmentData[]): void;

  /**
   * Add attachment
   */
  addAttachment(attachment: AttachmentData): void;

  /**
   * Set categories
   */
  setCategories(categories: string[]): void;

  /**
   * Add category
   */
  addCategory(category: string): void;

  /**
   * Set headers
   */
  setHeaders(headers: { [key: string]: string }): void;

  /**
   * Add a header
   */
  addHeader(key: string, value: string): void;

  /**
   * Set sections
   */
  setSections(sections: { [key: string]: string }): void;

  /**
   * Set custom args
   */
  setCustomArgs(customArgs: { [key: string]: string }): void;

  /**
   * Set tracking settings
   */
  setTrackingSettings(settings: TrackingSettings): void;

  /**
   * Set mail settings
   */
  setMailSettings(settings: MailSettings): void;

  /**
   * Set hide warnings
   */
  setHideWarnings(hide: boolean): void;

  /**
   * To JSON
   */
  toJSON(): MailJSON;

  /**
   * Create a Mail instance from given data
   */
  static create(data: MailData): Mail;

  /**
   * Create a Mail instance from given data
   */
  static create(data: Mail): Mail;

  /**
   * Create a Mail instance from given data
   */
  static create(data: MailData[]): Mail[];
}
