import { createContainer, InjectionMode, asValue, AwilixContainer, asClass } from 'awilix';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import { Logger, WinstonLogger, ErrorInterceptor, DynamoClientFactory } from '@template/shared';

import { Config, configuration } from './config';
import CollaboratorDynamoDbRepository from './infrastructure/repositories/collaborator-dynamodb.repository';
import CollaboratorQueriesService from './application/services/queries/collaborator.query.service';
import CollaboratorPrivateController from './presentation/private/controllers/collaborator.controller';

export interface Cradle {
  config: Config;
  dynamoDb: DynamoDBClient;
  logger: Logger;

  errorInterceptor: ErrorInterceptor;

  collaboratorDynamoDbRepository: CollaboratorDynamoDbRepository;

  collaboratorQueriesService: CollaboratorQueriesService;

  collaboratorPrivateController: CollaboratorPrivateController;
}

export const loadContainer = async (): Promise<AwilixContainer<Cradle>> => {
  const container = createContainer<Cradle>({
    injectionMode: InjectionMode.CLASSIC,
  });

  container.register({
    // Config
    config: asValue(configuration),

    // Logger
    logger: asClass(WinstonLogger)
      .inject((container: AwilixContainer) => ({
        isDebug: container.cradle.config.isDebug,
      }))
      .singleton(),

    // Middlewares
    errorInterceptor: asClass(ErrorInterceptor).singleton(),

    // Repositories
    collaboratorDynamoDbRepository: asClass(CollaboratorDynamoDbRepository).scoped(),

    // Application Services
    collaboratorQueriesService: asClass(CollaboratorQueriesService)
      .inject((container: AwilixContainer) => ({
        collaboratorRepository: container.cradle.collaboratorDynamoDbRepository,
      }))
      .transient(),

    // Presentation Controllers
    collaboratorPrivateController: asClass(CollaboratorPrivateController).scoped(),
  });

  container.register({
    // DynamoDB
    dynamoDb: asValue(
      DynamoClientFactory.getClient(
        {
          AWS_ACCESS_KEY_ID: container.cradle.config.AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY: container.cradle.config.AWS_SECRET_ACCESS_KEY,
          AWS_REGION_NAME: container.cradle.config.AWS_REGION_NAME,
          isDebug: container.cradle.config.isDebug,
        },
        container.cradle.logger
      )
    ),
  });

  return container;
};
