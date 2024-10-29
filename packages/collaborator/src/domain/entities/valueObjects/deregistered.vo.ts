import { BooleanValueObject } from '@template/shared';

export class CollaboratorDeregistered extends BooleanValueObject {
  private constructor(value: boolean) {
    super(value);
  }

  static create(value: boolean): CollaboratorDeregistered {
    return new CollaboratorDeregistered(value);
  }
}
