import { ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { PlatformConfig } from "@org/server/core";
import { UnauthorizedError } from "@org/server/exceptions";
import { ErrorReason } from "@org/utils/codes";
import { Request } from "express";
import { ICacheService } from "../../application/ports/cache.port";
import { CACHE_SERVICE } from "../../tokens";
import { SessionService } from "../application/services/session.service";
import { Strategy } from "../strategies/strategies.constants";

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard(Strategy.JWT_ACCESS_TOKEN) {
  private readonly domain: string;

  private readonly errorMetadata = {
    location: "Bearer",
    locationType: "header",
  };

  constructor(
    @Inject(CACHE_SERVICE) private readonly cache: ICacheService,
    private readonly sessionService: SessionService,
    private readonly config: ConfigService<PlatformConfig>,
  ) {
    super();

    this.domain = this.config.getOrThrow("platform.name");
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest<Request>();
    const userAccessTokenClaim = request.user as Record<string, string>;

    const isTokenRevoked = await this.sessionService.validate(
      userAccessTokenClaim.jti,
    );

    if (isTokenRevoked) {
      throw new UnauthorizedError(
        "Access token is invalid or expired.",
        ErrorReason.ACCESS_TOKEN_INVALID,
        this.domain,
        this.errorMetadata,
      );
    }

    request.user = {
      id: userAccessTokenClaim.sub,
      claim: userAccessTokenClaim,
    };

    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedError(
        err?.message,
        ErrorReason.REFRESH_TOKEN_INVALID,
        this.domain,
        this.errorMetadata,
      );
    }
    return user;
  }
}
