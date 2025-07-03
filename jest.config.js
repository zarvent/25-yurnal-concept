module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library|@dnd-kit|lodash-es)'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
