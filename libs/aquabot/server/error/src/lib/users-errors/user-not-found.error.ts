import { RetrieveUserBy } from "@aquabot/shared/contracts";
import { ResourceInfo } from "@org/server/exceptions";
import { ErrorCode } from "@org/utils/codes";
import { UserResource, buildResourcePathTemplate } from "@org/utils/resources";

export class UserNotFoundError extends ResourceInfo {
  public override readonly code = ErrorCode.NOT_FOUND;

  constructor(
    public readonly value: string,
    searchBy: RetrieveUserBy = RetrieveUserBy.ID,
    public override readonly message: string = "User not found.",
  ) {
    super(
      `User with \`${searchBy}\` \`${value}\` not found.`,
      UserResource.name,
      buildResourcePathTemplate(UserResource.pathTemplate, "DEFAULT", [value]),
      "",
    );
  }
}
