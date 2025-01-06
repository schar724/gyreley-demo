export class FirebaseFuntionResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FirebaseFunctionResponseError";
  }
}
