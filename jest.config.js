module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  resetMocks: false,
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  collectCoverage: false,
  // collectCoverageFrom: [
  //   "<rootDir>/src/**/*.{tsx,ts}",
  // ],
  coveragePathIgnorePatterns: [
    "node_modules",
  ],
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ['lcov', 'json'],
}