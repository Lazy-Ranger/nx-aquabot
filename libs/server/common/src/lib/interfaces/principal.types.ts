export interface IJwtCommonDecodedPayload {
  iat: number;
  exp: number;
  iss: string;
  jti: string;
  aud: string | string[];
}

export interface IJwtAccessTokenPayload {
  sub: string;
  email: string;
}

export interface IJwtRefreshTokenPayload {
  sub: string;
  email: string;
}

export interface IJwtIdTokenPayload {
  sub: string;
  email: string;
  phone: string;
  picture?: string;
  name: string;
  firstName: string;
  lastName?: string;
  gender: string;
}

export type IUserAccessTokenClaim = IJwtAccessTokenPayload &
  IJwtCommonDecodedPayload;

export type IUserRefreshTokenClaim = IJwtRefreshTokenPayload &
  IJwtCommonDecodedPayload;

export type OneOfPrincipalClaim =
  | IUserAccessTokenClaim
  | IUserRefreshTokenClaim;

export interface IPrincipal<TClaim = OneOfPrincipalClaim> {
  id: string; // user.id | service.id | jwt.sub

  claim: TClaim;

  // ability: unknown; // user.ability | service.ability -> permissions
}
