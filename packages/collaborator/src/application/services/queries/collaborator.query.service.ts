import { AppError, ErrorTypes } from 'packages/shared/dist';
import { CollaboratorRepository } from '../../../../src/domain/repositories/collaborator.repository';

export default class CollaboratorQueriesService {
  constructor(private readonly collaboratorRepository: CollaboratorRepository) {}

  async getByDocument(documentNumber: string) {
    const collaborator = await this.collaboratorRepository.getByDocument(documentNumber);
    if (!collaborator) {
      throw new AppError(
        ErrorTypes.NOT_FOUND,
        'Collaborator not found',
        'ERR_COLLABORATOR_NOT_FOUND'
      );
    }

    return collaborator;
  }
}
