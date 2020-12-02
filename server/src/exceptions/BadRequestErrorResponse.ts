import BaseErrorResponse from './BaseErrorResponse';

export default class BadRequestErrorResponse extends BaseErrorResponse {
  constructor() {
    super(
      'The request was poorly constructed. Please try again.',
      400
    );
  }
}