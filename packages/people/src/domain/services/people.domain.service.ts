import {
  AppError,
  Criteria,
  ErrorTypes,
  Filters,
  Operator,
  Order,
  Query,
  QueryInput,
  UniqueId,
  filterDeleted,
} from '@template/shared';

import { PeopleRepository } from '../repositories/people.repository';

export default class PeopleDomainService {
  constructor(private readonly peopleRepository: PeopleRepository) {}

  async getById(id: UniqueId) {
    const filterId: Map<string, string> = new Map([
      ['field', 'id'],
      ['operator', Operator.EQUAL],
      ['value', id],
    ]);

    const { people } = await this.matching({ filters: [filterId, filterDeleted()] });
    if (!people.length) {
      throw new AppError(ErrorTypes.NOT_FOUND, `Person not found`, 'ERR_PERSON_NOT_FOUND');
    }

    return people[0];
  }

  matching(input: QueryInput) {
    const query = new Query(input.filters, input.orderBy, input.orderType, input.page, input.take),
      criteria = new Criteria(
        Filters.fromValues(query.filters),
        Order.fromValues(query.orderBy, query.orderType),
        query.page,
        query.take
      );

    return this.peopleRepository.matching({
      criteria,
      isTotal: query.isTotal,
    });
  }
}
