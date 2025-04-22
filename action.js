// import { getInput, setFailed } from '@actions/core';
import { parse } from './dist/index.js';

export async function run() {
  // const label = getInput('label');
  const errors = await parse();
  console.log(errors);
}

run();

export default {
  run,
};
