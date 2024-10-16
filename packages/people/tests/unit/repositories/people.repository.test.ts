import PeopleMysqlRepository from '../../../src/infrastructure/repositories/people-mysql.repository';
import { People } from '../../../src/domain/entities/people.entity';
import {
  Logger,
  MysqlClientFactory,
  CriteriaConverter,
  UserAuthProvider,
  // AppError,
  UniqueEntityId,
} from '@template/shared';
import { Config } from '../../../src/config';
import { PeopleMapper } from '../../../src/infrastructure/mappers/people.mapper';
// import { RowDataPacket } from 'mysql2/promise';

jest.mock('@template/shared', () => ({
  Logger: jest.fn(),
  MysqlClientFactory: jest.fn(),
  CriteriaConverter: jest.fn(),
  UserAuthProvider: jest.fn(),
  AppError: jest.requireActual('@template/shared').AppError,
  ErrorTypes: jest.requireActual('@template/shared').ErrorTypes,
}));

describe('PeopleMysqlRepository', () => {
  let repository: PeopleMysqlRepository;
  let dbMock: MysqlClientFactory;
  let loggerMock: Logger;
  let criteriaConverterMock: CriteriaConverter;
  let userAuthProviderMock: UserAuthProvider;
  let config: Config;

  beforeEach(() => {
    dbMock = { query: jest.fn() } as unknown as MysqlClientFactory;
    loggerMock = { error: jest.fn(), info: jest.fn() } as unknown as Logger;
    criteriaConverterMock = { convert: jest.fn() } as unknown as CriteriaConverter;
    userAuthProviderMock = { get: jest.fn() } as unknown as UserAuthProvider;
    config = { PEOPLE_TABLE_NAME: 'people' } as Config;

    repository = new PeopleMysqlRepository(
      config,
      loggerMock,
      dbMock,
      criteriaConverterMock,
      userAuthProviderMock
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert a person into the database', async () => {
      const people = People.create({
        name: 'John Doe',
        height: 180,
        mass: 75,
        hairColor: 'brown',
        skinColor: 'fair',
        eyeColor: 'blue',
        birthYear: '1990',
        gender: 'male',
      });

      jest.spyOn(PeopleMapper, 'toCreatePersistence').mockReturnValue({
        id: UniqueEntityId.random(),
        name: 'John Doe',
        height: 180,
        mass: 75,
        hairColor: 'brown',
        skinColor: 'fair',
        eyeColor: 'blue',
        birthYear: '1990',
        gender: 'male',
      });

      await repository.create(people);

      expect(dbMock.query).toHaveBeenCalledWith({
        sql: `INSERT INTO people(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        values: ['John Doe', 180, 75, 'brown', 'fair', 'blue', '1990', 'male'],
      });
    });
  });

  /* describe('matching', () => {
    it('should return matching results from database', async () => {
      const input = {
        criteria: {},
        isTotal: true,
      };

      criteriaConverterMock.convert.mockReturnValue({
        filter: 'WHERE name = ?',
        sort: 'ORDER BY name ASC',
        values: ['John Doe'],
        page: 1,
        take: 10,
      });

      const mockRows: RowDataPacket[] = [
        {
          id: UniqueEntityId.random(),
          name: 'John Doe',
          height: 180,
          mass: 75,
          hairColor: 'brown',
          skinColor: 'fair',
          eyeColor: 'blue',
          birthYear: '1990',
          gender: 'male',
        },
      ] as RowDataPacket[];

      dbMock.query.mockResolvedValueOnce([mockRows]).mockResolvedValueOnce([{ total: 1 }]);

      const result = await repository.matching(input);

      expect(result.people.length).toBe(1);
      expect(result.total).toBe(1);
      expect(result.people[0].name).toBe('John Doe');
    });

    it('should log error and throw AppError if matching query fails', async () => {
      const input = { criteria: {}, isTotal: true };
      const error = new Error('DB error');
      dbMock.query.mockRejectedValueOnce(error);

      await expect(repository.matching(input)).rejects.toThrow(AppError);
      expect(loggerMock.error).toHaveBeenCalledWith(
        expect.stringContaining('Error in PeopleRepository of matching')
      );
    });
  }); */
});
