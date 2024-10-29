import {
  getMethodsByPrototype,
  getPropertyValueByType,
  MiddyLambdaContext,
  MiddyMiddleware,
} from '@template/shared';

import { Cradle, loadContainer } from './container';
import CollaboratorPrivateController from './presentation/private/controllers/collaborator.controller';

const handler =
  <T>(type: new (...args: any[]) => T, method: keyof T) =>
  async (event: any, context: MiddyLambdaContext) => {
    const container = await loadContainer(),
      controller = getPropertyValueByType<Cradle, T>(container.cradle, type);

    return MiddyMiddleware.use((controller[method] as (...args: any[]) => any).bind(controller), [
      container.cradle.errorInterceptor.use(),
    ])(event, context);
  };

const privateMethods = getMethodsByPrototype<CollaboratorPrivateController>(
  CollaboratorPrivateController.prototype
);

export = {
  // PRIVATE
  getByDocument: handler<CollaboratorPrivateController>(
    CollaboratorPrivateController,
    privateMethods.getByDocument
  ),
};
