import { Injectable } from "@nestjs/common";
import { UnauthorizedError } from "@org/server/exceptions";
import { ILoggedInUserResult, IUserLoginParams } from "../../../auth/contracts";
import { UserService } from "../../../user/application/services";
import { IssueTokensUseCase } from "./issue-tokens.use-case";

@Injectable()
export class LoginUserUseCase {
  private readonly domain: string;

  constructor(
    private readonly userService: UserService,
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
