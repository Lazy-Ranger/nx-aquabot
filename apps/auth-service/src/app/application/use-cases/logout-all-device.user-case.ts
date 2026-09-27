import { Injectable } from "@nestjs/common";
import { IPrincipal } from "@org/server/auth";
import { UserService } from "../../../user/application/services";
import { IUserLogoutAllDeviceParams } from "../../contracts";
import { SessionService } from "../services/session.service";

@Injectable()
export class LogoutUserAllDeviceUseCase {
  constructor(
    private readonly userService: UserService,
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
