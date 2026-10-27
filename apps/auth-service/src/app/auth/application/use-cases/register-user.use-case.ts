import { UserAlreadyExistsError } from "@aquabot/server/errors";
import { IUser } from "@aquabot/shared/contracts";
import { Inject, Injectable } from "@nestjs/common";
import { IUserService } from "../../../ports/user-service.port";
import { USER_SERVICE } from "../../../tokens";
import { IUserRegisterParams } from "../../contracts";

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  async execute(params: IUserRegisterParams): Promise<IUser> {
    const userExists = await this.userService.findByEmail(params.email);

    if (userExists) {
      throw new UserAlreadyExistsError(params.email);
    }

    return await this.userService.create(params);
  }
}
