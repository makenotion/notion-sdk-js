/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	// This is hacky, but we had to use a relative import
	// here to avoid a circular dependency.
	extends: ['../eslint-config/workers.cjs'],
}
