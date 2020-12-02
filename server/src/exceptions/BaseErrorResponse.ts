export default class BaseErrorResponse extends Error {
  errorMessage: string;
  statusCode: number;

  constructor(errorMessage: string, statusCode: number) {
    super(errorMessage);
    
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}