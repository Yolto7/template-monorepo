export interface ConfigBase {
  NODE_ENV: string;
  PORT: number;

  isDebug: boolean;
  isDevelopment: boolean;
  isStaging: boolean;
  isProduction: boolean;
}
