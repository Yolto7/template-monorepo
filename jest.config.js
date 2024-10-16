const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: ['/node_modules/(?!axios/)'],
  moduleNameMapper: {
    '^@template/shared$': path.resolve(__dirname, 'packages/shared/src'), // Uso de path.resolve
  },
};
