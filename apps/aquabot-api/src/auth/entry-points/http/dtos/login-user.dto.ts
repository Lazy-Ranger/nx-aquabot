import { ILoginUserRequest } from '@aquabot/shared/contract';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto implements ILoginUserRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  password!: string;
}
