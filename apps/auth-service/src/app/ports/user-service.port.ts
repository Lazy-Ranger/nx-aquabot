import { IUser, IUserCreateParams } from "@aquabot/shared/contracts";

export interface IUserService {
  findById(id: string): Promise<IUser | null>;

  findByIdOrFail(id: string): Promise<IUser>;

  findByEmail(email: string): Promise<IUser | null>;

  create(params: IUserCreateParams): Promise<IUser>;

  validateByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<IUser | null>;
}
