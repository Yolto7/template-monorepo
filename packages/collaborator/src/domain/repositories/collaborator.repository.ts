import { Collaborator } from '../entities/collaborator.entity';

export interface CollaboratorRepository {
  getByDocument(document: string): Promise<Collaborator | null>;
}
