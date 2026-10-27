import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedError } from "@org/server/exceptions";
// import { UserService } from "../../../user/application/services";
import { IUserService } from "../../../ports/user-service.port";
import { USER_SERVICE } from "../../../tokens";
import { ILoggedInUserResult, IUserLoginParams } from "../../contracts";
import { IssueTokensUseCase } from "./issue-tokens.use-case";

@Injectable()
export class LoginUserUseCase {
  private readonly domain: string;

  constructor(
    // private readonly userService: IUserService,
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    private readonly issueTokensUseCase: IssueTokensUseCase,
  ) {}

  async execute(params: IUserLoginParams): Promise<ILoggedInUserResult> {
    const { email, password } = params;

    const user = await this.userService.validateByEmailAndPassword(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedError("Email or password is incorrect.");
    }

    const issuedTokens = await this.issueTokensUseCase.execute({
      user,
    });

    return {
      user,
      ...issuedTokens,
    };
  }
}
