import { ErrorDetail } from "./errors-detail";

export class ResourceInfo extends ErrorDetail {
  public override readonly "@type" = "aquabot.ResourceInfo";

  public override message: string = "Resource not found.";

  public readonly description!: string;

  public readonly resourceType!: string;

  public readonly resourceName!: string;

  public readonly owner!: string;

  constructor(
    description: string,
    resourceType: string,
    resourceName: string,
    owner: string
  ) {
    super();
    this.description = description;
    this.resourceType = resourceType;
    this.resourceName = resourceName;
    this.owner = owner ?? "";
  }

  toJSON() {
    return {
      ...super.toJSON(),
      description: this.description,
      resourceType: this.resourceType,
      resourceName: this.resourceName,
      owner: this.owner
    };
  }
}
