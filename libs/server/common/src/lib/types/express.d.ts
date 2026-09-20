import { IClientRequestInfo, IUserAgent } from "./http-request.types";

declare global {
  namespace Express {
    interface Request {
      userAgent: IUserAgent;
      clientRequestInfo: IClientRequestInfo;
    }
  }
}

export {};
