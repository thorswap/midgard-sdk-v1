module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]s?$'],
  testPathIgnorePatterns: ['node_modules', 'dist', 'coverage'],
  testEnvironment: 'node',
};
