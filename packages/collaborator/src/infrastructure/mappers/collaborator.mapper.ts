import { UniqueEntityId, UniqueId } from '@template/shared';
import { Collaborator, CollaboratorCreateProps } from '../../domain/entities/collaborator.entity';

export interface CollaboratorDomain extends CollaboratorCreateProps {
  id: UniqueId;
}

interface CollaboratorPresentation {
  id: UniqueId;
  documentNumber: string;
  deregistered: boolean;
}

export class CollaboratorMapper {
  static toDomain(input: CollaboratorDomain) {
    return Collaborator.create(
      {
        documentNumber: input.documentNumber,
        deregistered: input.deregistered,
      },
      new UniqueEntityId(input.id)
    );
  }

  static toPresentation(collaborator: Collaborator): CollaboratorPresentation {
    return {
      id: collaborator.id,
      documentNumber: collaborator.documentNumber,
      deregistered: collaborator.deregistered,
    };
  }
}
