import { OneOfPrincipalClaim } from '@aquabot/shared/contract';

export interface IPrincipal<TClaim = OneOfPrincipalClaim> {
  id: string; // user.id | service.id | jwt.sub

  claim: TClaim;

  // ability: unknown; // user.ability | service.ability -> permissions
}
