import { ErrorCode, ResourceInfo } from '../../common/errors';
import { UserResource } from '../../common/resources';
import { buildResourcePathTemplate } from '../../common/resources/resource.utilts';
import { RetrieveUserBy } from '../contracts';

export class UserNotFoundError extends ResourceInfo {
  public readonly code = ErrorCode.NOT_FOUND;

  constructor(
    public readonly value: string,
    searchBy: RetrieveUserBy = RetrieveUserBy.ID,
    public readonly message: string = 'User not found.',
  ) {
    super(
      `User with \`${searchBy}\` \`${value}\` not found.`,
      UserResource.name,
      buildResourcePathTemplate(UserResource.pathTemplate, 'DEFAULT', [value]),
      '',
    );
  }
}
