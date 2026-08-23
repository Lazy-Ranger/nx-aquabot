import { ErrorCode } from '@org/shared/codes';
import { ErrorDetail } from './errors-detail';

export class SerializedErrorResponse {
  public readonly code: number; // http|grpc code
  public readonly message: string;
  public readonly status: ErrorCode | string;
  public readonly details: ErrorDetail[];

  constructor(
    code: number,
    message: string,
    status: ErrorCode | string,
    details: ErrorDetail[],
  ) {
    this.code = code;
    this.message = message;
    this.status = status;
    this.details = details;
  }
}
