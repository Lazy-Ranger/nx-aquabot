import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

import { ConfigService } from "@nestjs/config";
import { PlatformConfig } from "../../config/platform.config";
import {
  BadRequest,
  ErrorCodeHttpCodeMap,
  ErrorDetail,
  ErrorInfo,
  HttpStatusCodeErrorCodeMap,
  ResourceInfo,
  SerializedErrorResponse
} from "../errors";

type CatchableError = ErrorDetail | HttpException | Error | unknown;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private domain: string;
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly config: ConfigService<PlatformConfig>
  ) {
    this.domain = this.config.getOrThrow("platform.name");
  }

  catch(exception: CatchableError, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    let serializedException: SerializedErrorResponse;

    if (exception instanceof HttpException) {
      serializedException = this.fromHttpException(exception);
    } else if (exception instanceof ErrorDetail) {
      serializedException = this.fromErrorDetail(exception);
    } else {
      serializedException = this.fromError(exception);
    }

    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    httpAdapter.reply(response, serializedException, serializedException.code);
  }

  private fromErrorDetail(error: ErrorDetail): SerializedErrorResponse {
    const httpStatusCode = ErrorCodeHttpCodeMap[error.code];
    const message = error.message;
    const detail = error.toJSON();
    const details = [detail] as unknown as ErrorDetail[];

    return new SerializedErrorResponse(
      httpStatusCode,
      message,
      error.code,
      details
    );
  }

  private fromHttpException(exception: HttpException): SerializedErrorResponse {
    const httpStatusCode = exception.getStatus();
    const message = exception.message;
    const exceptionResponse = exception.getResponse();

    let detail = new ErrorDetail();

    const canBeResourceInfo = [
      HttpStatus.OK,
      403,
      404,
      405,
      409,
      500,
      504
    ].includes(httpStatusCode);

    const statusCode = HttpStatusCodeErrorCodeMap[httpStatusCode];

    if (canBeResourceInfo) {
      detail = new ResourceInfo(message, "", "", "");
      detail.code = statusCode;
    }

    const canBeBadRequest = [HttpStatus.BAD_REQUEST].includes(httpStatusCode);

    if (canBeBadRequest) {
      const errorMessages = (exceptionResponse as Record<"message", string[]>)
        ?.message;
      detail = new BadRequest(
        (errorMessages || []).map((message) => ({
          field: "body",
          description: message
        }))
      );
      detail.code = statusCode;
    }

    const canBeErrorInfo = [
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpStatus.SERVICE_UNAVAILABLE,
      HttpStatus.UNAUTHORIZED
    ].includes(httpStatusCode);

    if (canBeErrorInfo) {
      detail = new ErrorInfo(message, this.domain, {});
      detail.code = statusCode;
    }

    detail.message = message;
    return this.fromErrorDetail(detail!);
  }

  private fromError(error: Error | unknown): SerializedErrorResponse {
    const message = (error as Error)?.message;

    const detail = new ErrorInfo(message, this.domain, {});

    return this.fromErrorDetail(detail);
  }
}
