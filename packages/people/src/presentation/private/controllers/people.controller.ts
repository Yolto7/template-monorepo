import { APIGatewayProxyEvent } from 'aws-lambda';

import { AppSuccess } from '@template/shared';

import PeopleQueriesService from '../../../application/services/queries/people.query.service';
import PeopleValidator from '../../validators/people.validator';
import PeopleCreateCommandService from '../../../application/services/commands/people-create.command.service';
import { PeopleMapper } from '../../../infrastructure/mappers/people.mapper';

export default class PeoplePrivateController {
  constructor(
    private readonly peopleQueriesService: PeopleQueriesService,
    private readonly peopleCreateCommandService: PeopleCreateCommandService
  ) {}

  async search(_event: APIGatewayProxyEvent) {
    const { people, total, page, take, totalPages } = await this.peopleQueriesService.search();
    return AppSuccess.status(200).json({
      data: people.map((e) => PeopleMapper.toPresentation(e)),
      total,
      page,
      take,
      totalPages,
    });
  }

  async getSwapiAll(_event: APIGatewayProxyEvent) {
    return AppSuccess.status(200).json({
      data: await this.peopleQueriesService.getSwapiAll(),
    });
  }

  async create(event: APIGatewayProxyEvent) {
    await this.peopleCreateCommandService.handle(PeopleValidator.create(event.body));
    return AppSuccess.status(200).json();
  }
}
