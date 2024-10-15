import { AsyncLocalStorage } from 'async_hooks';

export interface UserAuthInfo {
  document: string;
  email: string;
  name: string;
  role: string;
  level: string;
  scope: string;
  superiorDocument?: string;
  superiorName?: string;
}

export interface RequestAsyncContext {
  token?: string;
  refreshToken?: string;
  user?: UserAuthInfo;
}

export class AsyncContext {
  private static storeContext = new AsyncLocalStorage();

  static get<T>(name: string): T | undefined {
    return (this.storeContext.getStore() as Map<string, T>)?.get(name) || undefined;
  }

  static set(name: string, value: unknown) {
    this.storeContext.enterWith(new Map([[name, value]]));
  }
}
