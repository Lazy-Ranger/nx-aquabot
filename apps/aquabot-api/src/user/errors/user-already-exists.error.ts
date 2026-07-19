import { UserResource } from "src/common/resources";
import { buildResourcePathTemplate } from "src/common/resources/resource.utilts";
import { ErrorCode, ResourceInfo } from "../../common/errors";

export class UserAlreadyExistsError extends ResourceInfo {
  public override readonly code = ErrorCode.ALREADY_EXISTS;

  constructor(
    public readonly value: string,
    public readonly message: string = "User already exits."
  ) {
    super(
      `User with email \`${value}\` already exists.`,
      UserResource.name,
      buildResourcePathTemplate(UserResource.pathTemplate, "DEFAULT", [value]),
      ""
    );
  }
}
