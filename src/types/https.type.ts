export interface SuccessResponse {
  success: true;
  message: string;
  data?: unknown;
}

export interface ErrorResponse {
  success: false;
  errorPrefix: string;
  errorMessage: string;
}

export type FirebaseFunctionResponse = SuccessResponse | ErrorResponse;
