import BaseErrorResponse from './BaseErrorResponse';

export default class ServerErrorResponse extends BaseErrorResponse {
  constructor(errorMessage?: string) {
    super(
      'An internal server occurred. Please consult administrator. ' +
      `${errorMessage ? errorMessage : ''}`,
      500
    );
  }
}