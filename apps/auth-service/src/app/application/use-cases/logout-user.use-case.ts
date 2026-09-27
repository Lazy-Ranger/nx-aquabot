import { Injectable } from "@nestjs/common";
import { IPrincipal } from "@org/server/auth";
import { IUserLogoutParams } from "../../contracts";
import { SessionService } from "../services/session.service";

@Injectable()
export class LogoutUserUseCase {
  constructor(private readonly sessionService: SessionService) {}

  async execute(
    principal: IPrincipal,
    params: IUserLogoutParams,
  ): Promise<boolean> {
    void principal;

    const { jti, userId } = params;

    await this.sessionService.destroy(jti, userId);

    return true;
  }
}
