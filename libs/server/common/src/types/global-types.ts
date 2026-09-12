export interface IUserAgent {
  browser: string;
  os: string;
  device: string;
  ua: string;
}

export interface IClientRequestInfo {
  ip: string | string[];
  userAgent: IUserAgent;
}
