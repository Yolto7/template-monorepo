import { AppError, ErrorTypes, StringValueObject } from '@template/shared';

export class CollaboratorDocumentNumber extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): CollaboratorDocumentNumber {
    if (!value) {
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'The collaborator document number cannot be empty',
        'ERR_INVALID_COLLABORATOR_DOCUMENT_NUMBER'
      );
    }

    return new CollaboratorDocumentNumber(value);
  }
}
