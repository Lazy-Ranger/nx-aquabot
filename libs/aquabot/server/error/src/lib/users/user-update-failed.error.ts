import { ErrorCode } from "@org/utils/codes";

export class UserUpdateFailedError extends Error {
  public readonly code = ErrorCode.INTERNAL;

  public readonly description!: string;

  constructor(
    public readonly id: string,
    public override readonly message: string = "User update failed.",
  ) {
    super(message);
    this.description = `Cannot update user with id \`${id}\`.`;
  }
}
