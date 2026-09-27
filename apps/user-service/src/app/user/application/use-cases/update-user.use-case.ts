import { UserUpdateFailedError } from "@aquabot/server/errors";
import { IUserUpdateParams, RetrieveUserBy } from "@aquabot/shared/contracts";
import { Inject, Injectable } from "@nestjs/common";
import { USER_REPO } from "../../../tokens";
import { User } from "../../domain/entities";
import { IUserRepo } from "../../domain/repos";
import { RetrieveUserUseCase } from "./retrieve-user.use-case";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    private readonly retrieveUserUC: RetrieveUserUseCase,
  ) {}

  async execute(id: string, params: IUserUpdateParams): Promise<User> {
    const user = await this.retrieveUserUC.execute({
      by: RetrieveUserBy.ID,
      value: id,
    });

    Object.assign(user, params);

    const updatedUser = await this.userRepo.updateById(id, user);

    if (!updatedUser) {
      throw new UserUpdateFailedError(user.id);
    }

    return updatedUser;
  }
}
