export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironment: "jsdom",
  moduleNameMapper: {
    'react-i18next': '<rootDir>/src/__mocks__/reacti18nextMock.tsx',
    'i18next': '<rootDir>/src/__mocks__/i18nextMocks.ts',
  },
}