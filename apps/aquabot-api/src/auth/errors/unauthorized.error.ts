import { ErrorCode, ErrorReason } from '../../common/errors';
import { ErrorInfo } from '../../common/errors/error-Info';
import { getPlatformConfig } from '../../config/platform.config';

export class UnauthorizedError extends ErrorInfo {
  public readonly code = ErrorCode.UNAUTHENTICATED;

  constructor(
    public readonly message = 'Unauthorized',
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
