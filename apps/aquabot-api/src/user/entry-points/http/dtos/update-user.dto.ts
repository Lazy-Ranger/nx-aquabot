import { IUserUpdateParams } from '@aquabot/shared/contracts';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements IUserUpdateParams {}
