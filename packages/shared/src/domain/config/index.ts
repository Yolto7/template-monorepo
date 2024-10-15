export interface ConfigBase {
  NODE_ENV: string;
  PORT: number;

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;

  isDebug: boolean;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
}
