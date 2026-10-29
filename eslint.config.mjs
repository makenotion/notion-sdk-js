import js from "@eslint/js"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import globals from "globals"

export default [
  { ignores: ["build/**"] },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"].map(config => ({
    ...config,
    files: ["**/*.ts"],
  })),
  {
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      curly: ["error", "all"],
      "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_assert",
          caughtErrors: "none",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: [
      "src/api-endpoints.ts",
      "src/api-endpoints/**/*.ts",
      "src/api-endpoint-methods.ts",
    ],
    rules: { curly: "off" },
  },
]
