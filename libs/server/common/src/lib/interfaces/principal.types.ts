import {
  IJwtAccessTokenPayload,
  IJwtCommonDecodedPayload,
  IJwtRefreshTokenPayload,
} from "./jwt.types";

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
