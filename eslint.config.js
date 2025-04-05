import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/*', 'node_modules/*', 'output/*']),
  {
    rules: {
      'prefer-const': 'error',
			semi: 'error',
		},
	},
]);
