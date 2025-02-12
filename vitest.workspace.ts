import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
	// All workspace packages (keep in sync with pnpm-workspace.yaml)
	'examples/*/vitest.config.ts',
	'packages/*/vitest.config.ts',
])
