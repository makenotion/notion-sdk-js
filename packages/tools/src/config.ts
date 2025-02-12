import { z } from 'zod'

import { getRepoRoot } from './path'

export async function getConfig(): Promise<Config> {
	const repoRoot = await getRepoRoot()
	const version = await getReleaseVersion()
	return Config.parse({ repoRoot, version } satisfies Config)
}

export type Config = z.infer<typeof Config>
export const Config = z.object({
	repoRoot: z.string().startsWith('/').min(2),
	version: z
		.string()
		.regex(/^\d{4}\.\d{2}\.\d{2}-[\da-f]{7,8}$/)
		.describe('unexpected version format'),
})

export async function getReleaseVersion(): Promise<string> {
	return z
		.string()
		.trim()
		.regex(/^\d{4}\.\d{2}\.\d{2}-[a-z0-9]{7,12}$/, {
			message: 'expected format: 2024.09.17-7d09fa6',
		})
		.parse(await $`echo $(date +'%Y.%m.%d')-$(git log -1 --pretty=format:%h)`.text())
}
