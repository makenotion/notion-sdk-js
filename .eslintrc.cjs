// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["examples/**", "packages/**"],
  extends: ["@repo/eslint-config/default.cjs"],
}
