import BaseErrorResponse from './BaseErrorResponse';

export default class NotFoundErrorResponse extends BaseErrorResponse {
  constructor() {
    super(
      'The requested resouce could not be found.',
      404
    );
  }
}