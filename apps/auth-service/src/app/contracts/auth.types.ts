import { IUser, IUserCreateParams } from '@aquabot/shared/contracts';

export type IRegisterUserRequest = Omit<
  IUserCreateParams,
  'provider' | 'providerUserId'
>;

export interface IssueTokenResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  jti: string;
}

export interface ILoggedInUserResult extends IssueTokenResponse {
  user: IUser;
}
