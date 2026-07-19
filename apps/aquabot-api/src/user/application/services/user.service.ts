import { Injectable } from "@nestjs/common";
import { UserNotFoundError } from "src/user/errors";
import { IUser, IUserCreateParams, RetrieveUserBy } from "../../contracts";
import { UserMapper } from "../mappers";
import { CreateUserUseCase, RetrieveUserUseCase } from "../use-cases";

@Injectable()
export class UserService {
  constructor(
    private readonly retrieveUserUseCase: RetrieveUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  async findById(id: string): Promise<IUser | null> {
    const user = await this.retrieveUserUseCase.execute({
      by: RetrieveUserBy.ID,
      value: id
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDto(user);
  }

  async findByIdOrFail(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new UserNotFoundError(id, RetrieveUserBy.ID);
    }

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await this.retrieveUserUseCase.execute({
        by: RetrieveUserBy.EMAIL,
        value: email
      });

      if (!user) {
        return null;
      }

      return UserMapper.toDto(user);
    } catch (err) {
      return null;
    }
  }

  async create(params: IUserCreateParams): Promise<IUser> {
    const user = await this.createUserUseCase.execute(params);

    return UserMapper.toDto(user);
  }

  async validateByEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await this.retrieveUserUseCase.execute({
      by: RetrieveUserBy.EMAIL,
      value: email
    });

    if (!(await user.hasValidPassword(password))) {
      return null;
    }

    return UserMapper.toDto(user);
  }
}
