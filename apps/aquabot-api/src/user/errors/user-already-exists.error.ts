import { ErrorCode, ResourceInfo } from '../../common/errors';
import { UserResource } from '../../common/resources';
import { buildResourcePathTemplate } from '../../common/resources/resource.utilts';

export class UserAlreadyExistsError extends ResourceInfo {
  public override readonly code = ErrorCode.ALREADY_EXISTS;

  constructor(
    public readonly value: string,
    public readonly message: string = 'User already exits.',
  ) {
    super(
      `User with email \`${value}\` already exists.`,
      UserResource.name,
      buildResourcePathTemplate(UserResource.pathTemplate, 'DEFAULT', [value]),
      '',
    );
  }
}
