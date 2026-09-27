import { UserAlreadyExistsError } from "@aquabot/server/errors";
import { IUser } from "@aquabot/shared/contracts";
import { Injectable } from "@nestjs/common";
import { UserService } from "../../../user/application/services";
import { IUserRegisterParams } from "../../contracts";

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(params: IUserRegisterParams): Promise<IUser> {
    const userExists = await this.userService.findByEmail(params.email);

    if (userExists) {
      throw new UserAlreadyExistsError(params.email);
    }

    return await this.userService.create(params);
  }
}
