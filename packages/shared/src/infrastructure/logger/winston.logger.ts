import { format, createLogger, transports, Logger as WinstonLoggerType } from 'winston';
import { Logger, Levels } from '../../domain/logger';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';

export class WinstonLogger implements Logger {
  private readonly FORMAT_LEVEL_REGEX = /[A-Z]{4,}/g;
  private logger: WinstonLoggerType;

  constructor(isDebug: boolean) {
    const loggerTransforms: (FileTransportInstance | ConsoleTransportInstance)[] = [
      new transports.Console(),
    ];

    isDebug &&
      loggerTransforms.push(
        new transports.File({ filename: `logs/${Levels.DEBUG}.log`, level: Levels.DEBUG }),
        new transports.File({ filename: `logs/${Levels.ERROR}.log`, level: Levels.ERROR }),
        new transports.File({ filename: `logs/${Levels.INFO}.log`, level: Levels.INFO })
      );

    this.logger = createLogger({
      level: Levels.INFO,
      format: format.combine(
        format.simple(),
        format.prettyPrint(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp} - ${level
              .substring(5)
              .toUpperCase()
              .match(this.FORMAT_LEVEL_REGEX)}: ${message}`
        )
      ),
      transports: loggerTransforms,
    });
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
  error(message: string | Error): void {
    this.logger.error(message);
  }
  info(message: string): void {
    this.logger.info(message);
  }
}
