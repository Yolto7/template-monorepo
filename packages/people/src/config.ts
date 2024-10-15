import { ConfigBase, RECRUITMENT_CONSTANTS } from '@template/shared';
import dotenv from 'dotenv';

dotenv.config();

export interface Config extends ConfigBase {
  PEOPLE_TABLE_NAME: string;

  SWAPI_API_BASE_URL: string;
}

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'staging',
  PORT: Number(process.env.PORT) || 3000,

  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_PORT: Number(process.env.DATABASE_PORT || 3306),
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',

  PEOPLE_TABLE_NAME: process.env.PEOPLE_TABLE_NAME || '',

  SWAPI_API_BASE_URL: process.env.SWAPI_API_BASE_URL || '',

  isDebug: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.DEBUG,
  isDevelopment: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.DEV,
  isStaging: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.STG,
  isProduction: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.PROD,
};
