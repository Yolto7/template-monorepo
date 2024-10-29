import { AggregateRoot, AuditEntry, UniqueEntityId } from '@template/shared';

import { CollaboratorDeregistered } from './valueObjects/deregistered.vo';
import { CollaboratorDocumentNumber } from './valueObjects/documentNumber.vo';

interface CollaboratorProps extends AuditEntry {
  documentNumber: CollaboratorDocumentNumber;
  deregistered: CollaboratorDeregistered;
}

export interface CollaboratorCreateProps extends AuditEntry {
  documentNumber: string;
  deregistered: boolean;
}

export class Collaborator extends AggregateRoot<CollaboratorProps> {
  private constructor(props: CollaboratorProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get documentNumber() {
    return this.props.documentNumber.value;
  }
  get deregistered() {
    return this.props.deregistered.value;
  }

  static create(props: CollaboratorCreateProps, id?: UniqueEntityId): Collaborator {
    return new Collaborator(
      {
        documentNumber: CollaboratorDocumentNumber.create(props.documentNumber),
        deregistered: CollaboratorDeregistered.create(props.deregistered),
        createdAt: props.createdAt,
      },
      id
    );
  }

  getUpdates() {
    const updates: Partial<CollaboratorCreateProps> = {};
    for (const [key, value] of Object.entries(this.props)) {
      value.isModified && (updates[key as keyof CollaboratorCreateProps] = value.value);
    }

    Object.keys(updates).length && Object.assign(updates, this.updateEntryAudit);
    return updates;
  }
}
