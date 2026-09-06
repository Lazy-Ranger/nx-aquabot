import { getPlatformConfig } from "@org/server/core";
import { ErrorCode, ErrorReason } from "@org/utils/codes";
import { ErrorInfo } from "./error-Info";

export class UnauthorizedError extends ErrorInfo {
  public override readonly code = ErrorCode.UNAUTHENTICATED;

  constructor(
    public override readonly message = "Unauthorized",
    reason?: string,
    domain?: string,
    metadata: Record<string, string> = {},
  ) {
    super(
      reason || ErrorReason.UNAUTHENTICATED,
      domain || getPlatformConfig().name,
      metadata,
    );
  }
}
