
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockAttachments from "../mockdb/attachments.json";

const ATTACHMENTS_KEY = "attachments";

sessionStorageUtil.initialize(ATTACHMENTS_KEY, mockAttachments);

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  clientId: string;
  parentId: string;
  table: string;
  uploadedAt: string;
}

function _readAttachments(): Attachment[] {
  return sessionStorageUtil.read<Attachment[]>(ATTACHMENTS_KEY);
}

function _writeAttachments(attachments: Attachment[]): void {
  sessionStorageUtil.write(ATTACHMENTS_KEY, attachments);
}

export const getAttachments = (plasticLocateId: string): Attachment[] => {
  const attachments = _readAttachments();
  return attachments.filter((attachment) => attachment.parentId === plasticLocateId);
};

export const addAttachments = (plasticLocateId: string, clientId: string, files: File[]): Attachment[] => {
  const attachments = _readAttachments();
  const newAttachments: Attachment[] = files.map((file) => {
    const id = `att-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    return {
      id,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      clientId,
      parentId: plasticLocateId,
      table: "plastic_locate",
      uploadedAt: new Date().toISOString(),
    };
  });

  const updatedAttachments = [...attachments, ...newAttachments];
  _writeAttachments(updatedAttachments);
  return newAttachments;
};

export const resetAttachments = (): void => {
  sessionStorage.clear();
  sessionStorageUtil.initialize(ATTACHMENTS_KEY, mockAttachments);
};

