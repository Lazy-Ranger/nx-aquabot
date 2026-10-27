import { Inject, Injectable } from "@nestjs/common";
import { IPrincipal } from "@org/server/auth";
// import { UserService } from "../../../user/application/services";
import { IUserService } from "../../../ports/user-service.port";
import { USER_SERVICE } from "../../../tokens";
import { IUserLogoutAllDeviceParams } from "../../contracts";
import { SessionService } from "../services/session.service";

@Injectable()
export class LogoutUserAllDeviceUseCase {
  constructor(
    // private readonly userService: UserService,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    private readonly sessionService: SessionService,
  ) {}

  async execute(
    principal: IPrincipal,
    params: IUserLogoutAllDeviceParams,
  ): Promise<boolean> {
    void principal;

    const userId = params.userId;

    await this.userService.findByIdOrFail(userId);

    await this.sessionService.destroyAll(userId);

    return true;
  }
}
