export interface AttachmentData {
  content: string;
  filename: string;
  type?: string;
  disposition?: string;
  contentId?: string;
}

export interface AttachmentJSON {
  content: string;
  filename: string;
  type?: string;
  disposition?: string;
  content_id?: string;
}

export default class Attachment {
  constructor(data?: AttachmentData);

  fromData(data: AttachmentData): void;
  setContent(content: string): void;
  setFilename(filename: string): void;
  setType(type: string): void;
  setDisposition(disposition: string): void;
  setContentId(contentId: string): void;
  toJSON(): AttachmentJSON;
}