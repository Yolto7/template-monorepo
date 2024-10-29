import { DynamoDBClient, QueryCommand, QueryInput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

import { AppError, ErrorTypes, Logger } from '@template/shared';

import { Config } from '../../config';
import { CollaboratorDomain, CollaboratorMapper } from '../mappers/collaborator.mapper';
import { CollaboratorRepository } from '../../domain/repositories/collaborator.repository';
import { Collaborator } from '../../domain/entities/collaborator.entity';

export default class CollaboratorDynamoDbRepository implements CollaboratorRepository {
  private readonly tableName: string;

  constructor(
    private readonly config: Config,
    private readonly logger: Logger,
    private readonly dynamoDb: DynamoDBClient
  ) {
    this.tableName = this.config.COLLABORATOR_TABLE_NAME;
  }

  async getByDocument(documentNumber: string): Promise<Collaborator | null> {
    try {
      const params: QueryInput = {
        TableName: this.tableName,
        IndexName: 'personal_document-index',
        KeyConditionExpression: 'personal_document = :documentNumber',
        ExpressionAttributeValues: {
          ':documentNumber': {
            S: parseInt(documentNumber).toString(),
          },
        },
        ScanIndexForward: false,
      };

      const { Items = [] } = await this.dynamoDb.send(new QueryCommand(params));
      return Items.length
        ? CollaboratorMapper.toDomain(unmarshall(Items[0]) as CollaboratorDomain)
        : null;
    } catch (error) {
      this.logger.error(
        `Error in CollaboratorRepository of getByDocument: ${JSON.stringify(error)}`
      );
      throw new AppError(ErrorTypes.BAD_REQUEST, 'Database unavailable', 'ERR_DATABASE');
    }
  }
}
