import { ValueObject } from '.';
import { AppError, ErrorTypes } from '../error';
import { sanitize } from '../../utils/helpers/xss';

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string, isEmptyAllowed = false) {
    value = sanitize(value.trim());
    if (!isEmptyAllowed && !value) {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Value string must be defined',
        'ERR_INVALID_VALUE'
      );
    }

    super(value);
  }
}
