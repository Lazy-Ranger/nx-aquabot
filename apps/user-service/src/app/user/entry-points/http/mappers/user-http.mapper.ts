import { IUser } from "@aquabot/shared/contracts";
import { UserMapper } from "../../../application/mappers";
import { User } from "../../../domain/entities";

export class UserHttpMapper {
  static toDto(user: User): IUser {
    return UserMapper.toDto(user);
  }

  static toDtos(users: User[]): IUser[] {
    return users.map(UserHttpMapper.toDto);
  }
}
