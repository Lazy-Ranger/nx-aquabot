import { ErrorDetail } from "./errors-detail";

export class ErrorInfo extends ErrorDetail {
  public override readonly "@type" = "aquabot.ErrorInfo";

  public readonly reason: string;
  public readonly domain: string;
  public readonly metadata: Record<string, string>;

  constructor(
    reason: string,
    domain: string,
    metadata: Record<string, string> = {}
  ) {
    super();

    this.reason = reason;
    this.domain = domain;
    this.metadata = metadata;
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      reason: this.reason,
      domain: this.domain,
      metadata: this.metadata
    };
  }
}
