import { Provider } from '@aquabot/shared/contract';
import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Principal } from '../../../../common/decorators/principal.decorator';
import { HttpExceptionFilter } from '../../../../common/exception-filters/http-exception.filter';
import { IHttpRequest, IPrincipal } from '../../../../common/interfaces';
import { AuthService } from '../../../application/services/auth.service';
import {
  LogoutUserAllDeviceUseCase,
  LogoutUserUseCase,
  RefreshTokensUseCase,
} from '../../../application/use-cases';
import { IRefreshTokenParams, IUserLoginParams } from '../../../contracts';
import { JwtAccessTokenGuard } from '../../../guards/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from '../../../guards/jwt-refresh-token.guard';
import { ClearRefreshTokenInterceptor } from '../../../interceptors/clear-refresh-token.interceptor';
import { SetRefreshTokenInterceptor } from '../../../interceptors/set-refresh-token.interceptor';
import { LoginUserDto, RegisterUserDto } from '../dtos';

@Controller('/auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logoutUserUseCase: LogoutUserUseCase,
    private readonly refreshTokenUC: RefreshTokensUseCase,
    private readonly logoutUserAllDevice: LogoutUserAllDeviceUseCase,
  ) {}

  @Post('/register')
  @UseInterceptors(SetRefreshTokenInterceptor)
  async register(
    @Body() registerUserReq: RegisterUserDto,
    @Req() req: IHttpRequest,
  ) {
    const userRegisterParams = {
      ...registerUserReq,
      provider: Provider.PASSWORD,
      clientRequestInfo: req.clientRequestInfo,
    };
    return this.authService.register(userRegisterParams);
  }

  @Post('/login')
  @UseInterceptors(SetRefreshTokenInterceptor)
  async login(@Body() loginUserReq: LoginUserDto, @Req() req: IHttpRequest) {
    const loginParams: IUserLoginParams = {
      ...loginUserReq,
      clientRequestInfo: req.clientRequestInfo,
    };
    return this.authService.login(loginParams);
  }

  @Post('/logout')
  @UseInterceptors(ClearRefreshTokenInterceptor)
  @UseGuards(JwtAccessTokenGuard)
  logout(@Principal() principal: IPrincipal) {
    console.log('logout', principal);
    return this.logoutUserUseCase.execute(principal, {
      jti: principal.claim.jti,
      userId: principal.id,
    });
  }

  @Post('/logout-all')
  @UseInterceptors(ClearRefreshTokenInterceptor)
  @UseGuards(JwtAccessTokenGuard)
  logoutAll(@Principal() principal: IPrincipal) {
    return this.logoutUserAllDevice.execute(principal, {
      jti: principal.claim.jti,
      userId: principal.id,
    });
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshTokenGuard)
  @UseInterceptors(SetRefreshTokenInterceptor)
  async refresh(@Req() req: IHttpRequest, @Principal() principal: IPrincipal) {
    const refreshTokenParams: IRefreshTokenParams = {
      jti: principal.claim.jti,
    };

    return this.refreshTokenUC.execute(principal, refreshTokenParams);
  }
}
