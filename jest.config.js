module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: 'spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.ts', '!**/*.module.ts', '!main.ts'],
  coveragePathIgnorePatterns: ['index.ts'],
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99,
    },
  },
  testEnvironment: 'node',
};
