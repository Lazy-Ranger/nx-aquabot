import { ResourceInfo } from "@org/server/exceptions";
import { ErrorCode } from "@org/utils/codes";
import { UserResource, buildResourcePathTemplate } from "@org/utils/resources";

export class UserAlreadyExistsError extends ResourceInfo {
  public override readonly code = ErrorCode.ALREADY_EXISTS;

  constructor(
    public readonly value: string,
    public override readonly message: string = "User already exits.",
  ) {
    super(
      `User with email \`${value}\` already exists.`,
      UserResource.name,
      buildResourcePathTemplate(UserResource.pathTemplate, "DEFAULT", [value]),
      "",
    );
  }
}
