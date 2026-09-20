import { Request } from "express";

export interface IUserAgent {
  browser: string;
  device: string;
  os: string;
  ua: string;
}

export interface IClientRequestInfo {
  ip: string[];
  userAgent: IUserAgent;
}

export interface IHttpRequest<TUser = Record<string, unknown>>
  extends Omit<Request, "user"> {
  userAgent: IUserAgent;
  clientRequestInfo: IClientRequestInfo;
  user: TUser;
}
