/* eslint-env node */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true,
    commonjs: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "none",
        argsIgnorePattern: "^_",
        caughtErrors: "none",
        ignoreRestSiblings: true,
      },
    ],
  },
}
