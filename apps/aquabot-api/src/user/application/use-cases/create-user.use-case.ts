import { IUserCreateParams } from '@aquabot/shared/contract';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { BcryptConfig } from '../../../config/bcrypt.config';
import { User } from '../../domain/entities';
import { IUserRepo } from '../../domain/repos';
import { UserAlreadyExistsError } from '../../errors/user-already-exists.error';
import { USER_REPO } from '../../tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPO) private readonly userRepo: IUserRepo,
    private readonly configService: ConfigService<BcryptConfig>,
  ) {}

  async execute(params: IUserCreateParams): Promise<User> {
    const salt = this.configService.get('bcrypt.salt') as number;

    const existingUser = await this.userRepo.findByEmail(params.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(params.email);
    }

    const hashedPassword = params.password
      ? await hash(params.password, salt)
      : undefined;

    const user = new User({
      ...params,
      password: hashedPassword,
    });

    return this.userRepo.create(user);
  }
}
