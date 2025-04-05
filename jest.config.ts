import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  passWithNoTests: true,
  testRegex: 'src/.*\.test\.ts$',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  verbose: true,
};

export default config;
