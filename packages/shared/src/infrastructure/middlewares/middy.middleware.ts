import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import middy, { MiddlewareObj } from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpSecurityHeaders from '@middy/http-security-headers';
import httpCors from '@middy/http-cors';

import { AsyncContext, RequestAsyncContext } from '../../utils/context';
import { RECRUITMENT_CONSTANTS } from '../../utils/constants';

export interface MiddyLambdaContext extends Context {
  asyncContext: RequestAsyncContext;
}

export type Handler = (event: APIGatewayProxyEvent) => Promise<unknown>;

export class MiddyMiddleware {
  constructor() {}

  static use(handler: Handler, middlewares: MiddlewareObj<any>[] = []) {
    return middy((event: APIGatewayProxyEvent, context: MiddyLambdaContext) => {
      AsyncContext.set(RECRUITMENT_CONSTANTS.ASYNCCONTEXT.REQUEST, context.asyncContext);
      return handler(event);
    }).use([
      httpCors(),
      httpHeaderNormalizer(),
      httpSecurityHeaders(),
      jsonBodyParser(),
      ...middlewares,
    ]);
  }
}
