import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JwtConfig } from "@org/server/auth";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IUserAccessTokenClaim } from "../contracts";
import { Strategy as JwtStrategy } from "./strategies.constants";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  JwtStrategy.JWT_ACCESS_TOKEN,
) {
  constructor(configService: ConfigService<JwtConfig>) {
    const secret = configService.getOrThrow("jwt.accessTokenSecret");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      issuer: configService.getOrThrow("jwt.issuer"),
      audience: configService.getOrThrow("jwt.audience"),
    });
  }

  async validate(
    payload: IUserAccessTokenClaim,
  ): Promise<IUserAccessTokenClaim> {
    return payload;
  }
}
