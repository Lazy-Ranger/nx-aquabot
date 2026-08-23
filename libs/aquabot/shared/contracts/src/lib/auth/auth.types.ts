export interface ILoginUserRequest {
  email: string;
  password: string;
}

export interface ILoggedInResponse {
  accessToken: string;
  idToken: string;
  refreshToken: string;
}
