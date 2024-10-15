import { StringValueObject } from '../valueObject/stringValueObject';

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
