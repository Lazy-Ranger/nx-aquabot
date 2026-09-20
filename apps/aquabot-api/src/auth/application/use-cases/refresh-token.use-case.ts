import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IPrincipal } from "@org/server/auth";
import { PlatformConfig } from "@org/server/core";
import { UserService } from "../../../user/application/services";
import { IRefreshTokenParams, IssueTokenResponse } from "../../contracts";
import { SessionService } from "../services/session.service";
import { IssueTokensUseCase } from "./issue-tokens.use-case";

@Injectable()
export class RefreshTokensUseCase {
  private readonly domain: string;

  private readonly errorMetadata = {
    location: "Refresh",
    locationType: "Invalid credentials",
  };
  constructor(
    private readonly userService: UserService,
    private readonly issueTokensUseCase: IssueTokensUseCase,
    private readonly sessionService: SessionService,
    private readonly config: ConfigService<PlatformConfig>,
  ) {}

  async execute(
    principal: IPrincipal,
    params: IRefreshTokenParams,
  ): Promise<IssueTokenResponse> {
    const { jti } = params;

    const claim = principal.claim;
    const userId = principal.id;

    const user = await this.userService.findByIdOrFail(userId);

    const nowInSeconds = Date.now() / 1000;

    if (claim.exp > nowInSeconds) {
      await this.sessionService.destroy(jti, userId);
    }

    return await this.issueTokensUseCase.execute({
      user,
    });
  }
}
