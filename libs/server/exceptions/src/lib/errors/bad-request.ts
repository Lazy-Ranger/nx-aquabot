import { ErrorDetail } from './errors-detail';

export interface FieldViolation {
  field: string;
  description: string;
}

export class BadRequest extends ErrorDetail {
  public override readonly '@type' = 'aquabot.BadRequestInfo';

  public readonly fieldViolations: FieldViolation[];

  constructor(fieldViolations: FieldViolation[] = []) {
    super();

    this.fieldViolations = fieldViolations;
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      fieldViolations: this.fieldViolations,
    };
  }
}
