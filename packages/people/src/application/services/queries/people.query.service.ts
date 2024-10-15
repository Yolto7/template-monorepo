import { filterDeleted, OrderTypes, translateKey } from '@template/shared';

import PeopleDomainService from '../../../domain/services/people.domain.service';
import { SwapiNormalize, SwapiPeople, SwapiProxyPort } from '../../../domain/ports/swapiProxy.port';

export default class PeopleQueriesService {
  constructor(
    private readonly peopleDomainService: PeopleDomainService,
    private readonly swapiProxyPort: SwapiProxyPort
  ) {}

  search() {
    return this.peopleDomainService.matching({
      filters: [filterDeleted()],
      orderBy: 'createdAt',
      orderType: OrderTypes.DESC,
    });
  }

  async getSwapiAll() {
    const data = await this.swapiProxyPort.getPeople();
    return this.swapiNormalizeData(data);
  }

  private swapiNormalizeData(data: SwapiPeople[]) {
    const newArray = [];
    for (const item of data) {
      const newObject: SwapiNormalize = {} as SwapiNormalize;

      for (const key of Object.keys(item)) {
        const value = item[key as keyof SwapiPeople];
        const newKey = translateKey(key) as keyof SwapiNormalize;
        newKey && (newObject[newKey] = value as unknown as string);
      }

      newArray.push(newObject);
    }

    return newArray;
  }
}
