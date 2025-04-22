import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  passWithNoTests: true,
  preset: 'ts-jest/presets/default-esm',
  testRegex: 'src/.*\.test\.ts$',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  verbose: true,
};

export default config;
