import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		setupFiles: [`${__dirname}/src/test/global-setup.ts`],
	},
})
