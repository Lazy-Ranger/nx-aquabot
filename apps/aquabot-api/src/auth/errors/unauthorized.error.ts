import { ErrorCode, ErrorReason } from "src/common/errors";
import { getPlatformConfig } from "src/config/platform.config";
import { ErrorInfo } from "../../common/errors/error-Info";

export class UnauthorizedError extends ErrorInfo {
  public readonly code = ErrorCode.UNAUTHENTICATED;

  constructor(
    public readonly message = "Unauthorized",
    reason?: string,
    domain?: string,
    metadata: Record<string, string> = {}
  ) {
    super(
      reason || ErrorReason.UNAUTHENTICATED,
      domain || getPlatformConfig().name,
      metadata
    );
  }
}
