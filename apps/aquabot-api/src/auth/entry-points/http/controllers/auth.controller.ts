import {
  ILoggedInResponse,
  IRefreshTokenResponse,
  Provider,
} from "@aquabot/shared/contracts";
import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { IPrincipal, Principal } from "@org/server/auth";
import { HttpExceptionFilter, IHttpRequest } from "@org/server/common";
import { omit } from "lodash";
import { AuthService } from "../../../application/services/auth.service";
import {
  LogoutUserAllDeviceUseCase,
  LogoutUserUseCase,
  RefreshTokensUseCase,
} from "../../../application/use-cases";
import { IRefreshTokenParams, IUserLoginParams } from "../../../contracts";
import { JwtAccessTokenGuard } from "../../../guards/jwt-access-token.guard";
import { JwtRefreshTokenGuard } from "../../../guards/jwt-refresh-token.guard";
import { ClearRefreshTokenInterceptor } from "../../../interceptors/clear-refresh-token.interceptor";
import { SetRefreshTokenInterceptor } from "../../../interceptors/set-refresh-token.interceptor";
import { LoginUserDto, RegisterUserDto } from "../dtos";

@Controller("/auth")
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly refreshTokenUC: RefreshTokensUseCase,
    private readonly logoutUserAllDevice: LogoutUserAllDeviceUseCase,
  ) {}

  @Post("/register")
  @UseInterceptors(SetRefreshTokenInterceptor)
  async register(
    @Body() registerUserReq: RegisterUserDto,
    @Req() req: IHttpRequest,
  ): Promise<ILoggedInResponse> {
    const userRegisterParams = {
      ...registerUserReq,
      provider: Provider.PASSWORD,
      clientRequestInfo: req.clientRequestInfo,
    };
    return this.authService.register(userRegisterParams);
  }

  @Post("/login")
  @UseInterceptors(SetRefreshTokenInterceptor)
  async login(
    @Body() loginUserReq: LoginUserDto,
    @Req() req: IHttpRequest,
  ): Promise<ILoggedInResponse> {
    const loginParams: IUserLoginParams = {
      ...loginUserReq,
      clientRequestInfo: req.clientRequestInfo,
    };
    return this.authService.login(loginParams);
  }

  @Post("/logout")
  @UseInterceptors(ClearRefreshTokenInterceptor)
  @UseGuards(JwtAccessTokenGuard)
  logout(@Principal() principal: IPrincipal) {
    return this.logoutUserUseCase.execute(principal, {
      jti: principal.claim.jti,
      userId: principal.id,
    });
  }

  @Post("/logout-all")
  @UseInterceptors(ClearRefreshTokenInterceptor)
  @UseGuards(JwtAccessTokenGuard)
  logoutAll(@Principal() principal: IPrincipal) {
    return this.logoutUserAllDevice.execute(principal, {
      jti: principal.claim.jti,
      userId: principal.id,
    });
  }

  @Post("/refresh")
  @UseGuards(JwtRefreshTokenGuard)
  @UseInterceptors(SetRefreshTokenInterceptor)
  async refresh(
    @Principal() principal: IPrincipal,
  ): Promise<IRefreshTokenResponse> {
    const refreshTokenParams: IRefreshTokenParams = {
      jti: principal.claim.jti,
    };

    const refreshTokenResp = await this.refreshTokenUC.execute(
      principal,
      refreshTokenParams,
    );

    return omit(refreshTokenResp, "jti");
  }
}
