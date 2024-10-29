import { ConfigBase, RECRUITMENT_CONSTANTS } from '@template/shared';
import dotenv from 'dotenv';

dotenv.config();

export interface Config extends ConfigBase {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION_NAME: string;

  COLLABORATOR_TABLE_NAME: string;
}

export const configuration: Config = {
  NODE_ENV: process.env.NODE_ENV || 'staging',
  PORT: Number(process.env.PORT) || 3000,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
  AWS_REGION_NAME: process.env.AWS_REGION_NAME || '',

  COLLABORATOR_TABLE_NAME: process.env.COLLABORATOR_TABLE_NAME || '',

  isDebug: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.DEBUG,
  isDevelopment: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.DEV,
  isStaging: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.STG,
  isProduction: process.env.NODE_ENV === RECRUITMENT_CONSTANTS.ENVIRONMENTS.PROD,
};
