import { APIGatewayProxyEvent } from 'aws-lambda';

import { AppSuccess, sanitize } from '@template/shared';

import CollaboratorQueriesService from '../../../application/services/queries/collaborator.query.service';
import { CollaboratorMapper } from '../../../infrastructure/mappers/collaborator.mapper';

export default class CollaboratorPrivateController {
  constructor(private readonly collaboratorQueriesService: CollaboratorQueriesService) {}

  async getByDocument(event: APIGatewayProxyEvent) {
    const data = await this.collaboratorQueriesService.getByDocument(
      sanitize(event.pathParameters?.documentNumber)
    );
    return AppSuccess.status(200).json({
      data: CollaboratorMapper.toPresentation(data),
    });
  }
}
