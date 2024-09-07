import {Config} from '@jest/types';


const baseDir: string = '<rootDir>/lib/'
const baseTestDir: string = '<rootDir>/test/'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    baseTestDir + 'infra/**/*test.ts',
    baseTestDir + 'src/**/*test.ts',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    baseDir + 'infra/**/*.ts',
    baseDir + 'src/**/*.ts',
  ]
}

export default config;