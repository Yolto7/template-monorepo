import { CriteriaConverter, Logger, MysqlClientFactory, UserAuthProvider } from '@template/shared';

import { config } from '../../../src/config';
import { People } from '../../../src/domain/entities/people.entity';
import { PeopleMapper } from '../../../src/infrastructure/mappers/people.mapper';
import PeopleMysqlRepository from '../../../src/infrastructure/repositories/people-mysql.repository';

const dbMock = {
    query: jest.fn(),
  } as unknown as MysqlClientFactory,
  loggerMock = {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  } as unknown as Logger,
  criteriaConverterMock = {
    convert: jest.fn(),
  } as unknown as CriteriaConverter,
  userAuthProviderMock = {
    get: jest.fn(),
  } as unknown as UserAuthProvider;

describe('PeopleRepository', () => {
  let peopleRepository: PeopleMysqlRepository;

  beforeEach(() => {
    peopleRepository = new PeopleMysqlRepository(
      config,
      loggerMock,
      dbMock,
      criteriaConverterMock,
      userAuthProviderMock
    );
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should insert a person into the database', async () => {
      // Simulamos que el query de la base de datos no devuelve errores
      // dbMock.query.mockResolvedValueOnce({});

      const people = People.create({
        name: 'John Doe',
        height: 12,
        mass: 12,
        hairColor: 'normal',
        skinColor: 'normal',
        eyeColor: 'normal',
        birthYear: 'normal',
        gender: 'normal',
      });

      await peopleRepository.create(people);

      const keys: unknown[] = [],
        values: unknown[] = [];

      for (const [key, value] of Object.entries(PeopleMapper.toCreatePersistence(people))) {
        keys.push(key);
        values.push(value);
      }

      expect(dbMock.query).toHaveBeenCalledWith(
        `INSERT INTO people (${keys.join(', ')}) VALUES (${Array(keys.length).fill('?').join(', ')})`,
        values
      );
    });
  });
});
