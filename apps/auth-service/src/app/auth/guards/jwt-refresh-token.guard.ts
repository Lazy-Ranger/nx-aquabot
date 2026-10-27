import { ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { PlatformConfig } from "@org/server/core";
import { UnauthorizedError } from "@org/server/exceptions";
import { ErrorReason } from "@org/utils/codes";
import { Request } from "express";
import { RefreshTokenService } from "../application/services/refresh-token.service";
import { Strategy } from "../strategies/strategies.constants";

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard(
  Strategy.JWT_REFRESH_TOKEN,
) {
  private readonly domain: string;

  private readonly errorMetadata = {
    location: "Bearer",
    locationType: "header",
  };

  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly config: ConfigService<PlatformConfig>,
  ) {
    super();
    this.domain = this.config.getOrThrow("platform.name");
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.refreshTokenService.extractFromCookie(request);

    if (!token || (await this.refreshTokenService.isTokenRevoked(token))) {
      throw new UnauthorizedError(
        "Access token is invalid or expired.",
        ErrorReason.ACCESS_TOKEN_INVALID,
        this.domain,
        this.errorMetadata,
      );
    }

    const userRefreshTokenClaim = request.user; // decoded via passport

    request.user = {
      id: token,
      claim: userRefreshTokenClaim,
    };

    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log("Error in JWT Refresh Token Guard:", err, info);
      // const unauthorizedError = new UnauthorizedError(err?.message);

      // throw new UnauthorizedException(unauthorizedError);

      throw new UnauthorizedError(
        err?.message,
        ErrorReason.ACCESS_TOKEN_INVALID,
        this.domain,
        this.errorMetadata,
      );
    }
    return user;
  }
}
