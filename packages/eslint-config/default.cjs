// @ts-check
const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
	ignorePatterns: [
		// Ignore dotfiles
		'.*.{js,cjs}',
		'**/node_modules/**',
		'**/dist/**',
	],
	extends: ['turbo'],
	plugins: ['@typescript-eslint', 'import', 'unused-imports'],
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
	},
	overrides: [
		// TypeScript
		{
			files: ['**/*.{ts,tsx}'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				project: true,
			},
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:import/typescript',
				'turbo',
				'prettier', // disable rules that conflict with prettier
			],
			rules: {
				'no-empty': 'warn',
				'@typescript-eslint/consistent-type-imports': [
					'warn',
					{ prefer: 'type-imports', disallowTypeAnnotations: true },
				],
				'@typescript-eslint/explicit-function-return-type': 'warn',
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/no-unused-vars': [
					'warn',
					{
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						caughtErrorsIgnorePattern: '^_',
					},
				],

				// Prefer Array<T> over T[] syntax for custom types.
				// This makes custom/complex types more readable.
				'@typescript-eslint/array-type': [
					'warn',
					{
						default: 'array-simple',
					},
				],
				eqeqeq: ['error', 'always'],
				'@typescript-eslint/no-explicit-any': 'warn',
				'prefer-const': 'warn',
				'@typescript-eslint/strict-boolean-expressions': [
					'error',
					{
						allowNullableString: true,
						allowNullableBoolean: true,
					},
				],
				'unused-imports/no-unused-imports': 'warn',
				'@typescript-eslint/naming-convention': [
					'error',
					// enforce that all function names are in camelCase
					{
						selector: ['function'],
						format: ['camelCase'],
					},
				],
				'no-shadow': 'off',
				'@typescript-eslint/no-shadow': 'error',
				'@typescript-eslint/no-floating-promises': 'warn',
				'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			},
		},

		// Node
		{
			files: ['.eslintrc.cjs'],
			env: {
				node: true,
			},
		},
	],
}
