module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '<rootDir>/cypress/'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/app/$1',
      '@environments/(.*)': '<rootDir>/src/environments/$1',
    },
  };
  
  