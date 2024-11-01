import { createPool, Pool } from 'mysql2/promise';

import { Logger } from '../../../domain/logger';

interface ConfigDb {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
}

export class MysqlClientFactory {
  private static instance: MysqlClientFactory;
  private client: Pool;

  private constructor(
    private readonly config: ConfigDb,
    private readonly logger: Logger
  ) {
    this.client = this.createPool();
  }

  static getClient(config: ConfigDb, logger: Logger): Pool {
    if (!MysqlClientFactory.instance) {
      MysqlClientFactory.instance = new MysqlClientFactory(config, logger);
    }

    return MysqlClientFactory.instance.client;
  }

  private createPool(): Pool {
    this.logger.info(`Database pool created`);
    return createPool({
      host: this.config.DATABASE_HOST,
      port: this.config.DATABASE_PORT || 3306,
      user: this.config.DATABASE_USER,
      password: this.config.DATABASE_PASSWORD,
      database: this.config.DATABASE_NAME,
      connectionLimit: 10000,
      connectTimeout: 20000,
      idleTimeout: 20000,
    });
  }
}
