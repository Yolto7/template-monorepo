import { RequestAsyncContext, AsyncContext } from '../../utils/context';
import { RECRUITMENT_CONSTANTS } from '../../utils/constants';
import { UniqueEntityId, UniqueId } from '../entity/uniqueEntityId';

export interface DomainEventInput {
  aggregateId: UniqueId;
  entity: string;
  eventName: string;
  eventId?: UniqueId;
  occurredOn?: Date;
}

export interface DomainEventClass {
  EVENT_NAME: string;
}

export abstract class DomainEvent {
  readonly aggregateId: UniqueId;
  readonly entity: string;
  readonly eventName: string;
  readonly eventId: UniqueId;
  readonly occurredOn: Date;
  readonly context: RequestAsyncContext | undefined;

  constructor({ aggregateId, entity, eventName, eventId, occurredOn }: DomainEventInput) {
    this.aggregateId = aggregateId;
    this.entity = entity;
    this.eventName = eventName;
    this.eventId = eventId || UniqueEntityId.random();
    this.occurredOn = occurredOn || new Date();
    this.context = AsyncContext.get<RequestAsyncContext>(
      RECRUITMENT_CONSTANTS.ASYNCCONTEXT.REQUEST
    );
  }
}
