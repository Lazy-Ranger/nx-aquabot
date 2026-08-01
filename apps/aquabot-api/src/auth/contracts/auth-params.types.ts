import {
  ILoginUserRequest,
  IRegisterUserRequest,
  IUser,
  Provider,
} from '@aquabot/shared/contract';
import { IClientRequestInfo } from '../../common/interfaces';

export interface IRefreshTokenParams {
  jti: string;
}

export interface IIssueTokensParams {
  user: IUser;
}

export interface IUserRegisterParams extends IRegisterUserRequest {
  provider: Provider;

  clientRequestInfo: IClientRequestInfo;
}

export interface IUserLoginParams extends ILoginUserRequest {
  clientRequestInfo: IClientRequestInfo;
}

export interface IUserLogoutParams {
  jti: string;
  userId: string;
}

export type IUserLogoutAllDeviceParams = IUserLogoutParams;
