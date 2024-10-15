import { RECRUITMENT_CONSTANTS } from '../../utils/constants';
import { RequestAsyncContext, UserAuthInfo, AsyncContext } from '../../utils/context';

export class UserAuthProvider {
  get(): UserAuthInfo {
    const traceContext = AsyncContext.get<RequestAsyncContext>(
      RECRUITMENT_CONSTANTS.ASYNCCONTEXT.REQUEST
    );

    return traceContext?.user as UserAuthInfo;
  }
}
