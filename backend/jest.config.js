/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  rootDir: "./src",
  roots: ["<rootDir>/test"],
  testEnvironment: 'node',
  // enable collect coverage
  collectCoverage: true,
  // output report dir 
  coverageDirectory: 'coverage',
  // assign format
  coverageReporters: ['json', 'html', 'text', 'lcov'],

  // verbose output
  verbose: true

};