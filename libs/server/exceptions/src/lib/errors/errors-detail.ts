import { ErrorCode } from "@org/utils/codes";

export interface IErrorTypeDetail {
  "@type": string;
}

export type ErrorDetailJsonSerializerFn = (
  error: ErrorDetail,
) => IErrorTypeDetail & {
  [key: string]: unknown;
};

export type ErrorDetailJsonSerializerFnReturnType =
  ReturnType<ErrorDetailJsonSerializerFn>;

export interface IErrorCodeMessage extends IErrorTypeDetail {
  code: ErrorCode | string;
  message: string;
  toJSON: ErrorDetailJsonSerializerFn;
}

export class ErrorDetail implements IErrorCodeMessage {
  public readonly "@type": string = "aquabot.ErrorDetail" as const;

  public code: ErrorCode | string = ErrorCode.UNKNOWN;

  public message: string = "Unknown error.";

  toJSON(): ReturnType<ErrorDetailJsonSerializerFn> {
    return {
      "@type": this["@type"],
    };
  }
}
