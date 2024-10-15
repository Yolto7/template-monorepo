import {
  getMethodsByPrototype,
  getPropertyValueByType,
  MiddyLambdaContext,
  MiddyMiddleware,
} from '@template/shared';

import { Cradle, loadContainer } from './container';
import PeoplePrivateController from './presentation/private/controllers/people.controller';
import PeoplePublicController from './presentation/public/controllers/people.controller';

const handler =
  <T>(type: new (...args: any[]) => T, method: keyof T) =>
  async (event: any, context: MiddyLambdaContext) => {
    const container = await loadContainer(),
      controller = getPropertyValueByType<Cradle, T>(container.cradle, type);

    return MiddyMiddleware.use((controller[method] as (...args: any[]) => any).bind(controller), [
      container.cradle.errorInterceptor.use(),
    ])(event, context);
  };

const privateMethods = getMethodsByPrototype<PeoplePrivateController>(
    PeoplePrivateController.prototype
  ),
  publicMethods = getMethodsByPrototype<PeoplePublicController>(PeoplePublicController.prototype);

export = {
  // PRIVATE
  search: handler<PeoplePrivateController>(PeoplePrivateController, privateMethods.search),
  create: handler<PeoplePrivateController>(PeoplePrivateController, privateMethods.create),

  // PUBLIC
  getSwapiAll: handler<PeoplePublicController>(PeoplePublicController, publicMethods.getSwapiAll),
};
