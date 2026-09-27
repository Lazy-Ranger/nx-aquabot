import { IUserSearchParams } from "@aquabot/shared/contracts";
import { Inject, Injectable } from "@nestjs/common";
import { IOffsetPaginationResult } from "@org/utils/pagination";
import { USER_REPO } from "../../../tokens";
import { User } from "../../domain/entities";
import { IUserRepo } from "../../domain/repos";

@Injectable()
export class SearchUsersUseCase {
  constructor(@Inject(USER_REPO) private readonly userRepo: IUserRepo) {}

  execute(params: IUserSearchParams): Promise<IOffsetPaginationResult<User>> {
    return this.userRepo.searchUsers(params);
  }
}
