export class PendingChatExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PendingChatExistsError";
  }
}
