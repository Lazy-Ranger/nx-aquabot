import { IClientRequestInfo, IUserAgent } from "@aquabot/shared/contract";

declare global {
  namespace Express {
    interface Request {
      userAgent: IUserAgent;
      clientRequestInfo: IClientRequestInfo;
    }
  }
}

export {};
