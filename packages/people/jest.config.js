const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: [
    'node_modules/(?!@template/shared)', // Permite transformar `@template/shared`
  ],
  moduleNameMapper: {
    '^@template/shared$': path.resolve(__dirname, '../shared/dist'), // Ruta a `@template/shared`
  },
};
