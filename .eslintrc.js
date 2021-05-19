/* eslint-env node */

module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: "./tsconfig.json",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "unused-imports", "formatjs", "import"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				// TODO(lint): Remove this.
				checksVoidReturn: false,
			},
		],
		"@typescript-eslint/require-await": "error",
		"@typescript-eslint/semi": ["error", "never"],
		// https://github.com/sweepline/eslint-plugin-unused-imports
		"@typescript-eslint/no-unused-vars": "off",
		"unused-imports/no-unused-imports": [
			"error",
			{
				varsIgnorePattern: "^_",
			},
		],
		"unused-imports/no-unused-vars": [
			"error",
			{
				args: "none",
				argsIgnorePattern: "^_",
				caughtErrors: "none",
				ignoreRestSiblings: true,
				varsIgnorePattern: "^_",
			},
		],
		curly: "error",
		eqeqeq: ["error", "always"],
		"no-console": [
			"error",
			{
				allow: [
					"info",
					"group",
					"groupCollapsed",
					"groupEnd",
					"table",
					"time",
					"timeEnd",
				],
			},
		],
		"formatjs/enforce-default-message": "error",
		"formatjs/enforce-placeholders": "error",
		"formatjs/enforce-plural-rules": [
			2,
			{
				one: true,
				other: true,
				zero: false,
			},
		],
		"formatjs/no-multiple-whitespaces": "error",
		"no-debugger": "error",
		"prefer-const": "error",
		"prefer-template": "error",
	},
}
