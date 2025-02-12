import { cliError } from '@jahands/cli-tools'
import * as toml from 'smol-toml'
import { z } from 'zod'

import { getRepoRoot } from './path'

export async function updatePnpm() {
	const repoRoot = getRepoRoot()
	cd(repoRoot)
	echo(chalk.white(`Checking for pnpm updates...`))
	const res = await fetch('https://registry.npmjs.org/pnpm')
	if (!res.ok) {
		throw cliError(`Failed to fetch pnpm registry: ${res.status}`)
	}
	const body = await res.json()
	const pnpm = NpmRegistryPnpmResponse.parse(body)
	const latest = pnpm['dist-tags']['latest']
	echo(chalk.blue(`Latest pnpm version: ${latest}`))

	let versionUpdated = false
	const packageJsonPath = `${repoRoot}/package.json`
	const packageJson = PackageJson.parse(
		JSON.parse(await fs.readFile(packageJsonPath).then((b) => b.toString()))
	)
	if (packageJson.packageManager !== `pnpm@${latest}`) {
		echo(chalk.blue(`Updating package.json to pnpm@${latest}`))
		packageJson.packageManager = `pnpm@${latest}`
		await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
		versionUpdated = true
	}

	const miseToml = MiseToml.parse(
		toml.parse(await fs.readFile(`${repoRoot}/.mise.toml`).then((b) => b.toString()))
	)
	if (miseToml.tools.pnpm !== latest) {
		echo(chalk.blue(`Updating .mise.toml to pnpm@${latest}`))
		miseToml.tools.pnpm = latest
		const miseString = toml.stringify(miseToml) + '\n'
		await fs.writeFile(`${repoRoot}/.mise.toml`, miseString.replaceAll('"', "'"))
		versionUpdated = true
	}

	if (versionUpdated) {
		echo(chalk.blue(`Running just fix...`))
		await $`pnpm runx fix`
		echo(chalk.greenBright(`Successfully updated pnpm to ${latest}`))
	} else {
		echo(chalk.green(`No pnpm updates needed, already on ${latest}`))
	}
}

const Semver = z.string().regex(/^\d+\.\d+\.\d+$/)
const NpmRegistryPnpmResponse = z.object({
	_id: z.literal('pnpm'),
	name: z.literal('pnpm'),
	'dist-tags': z.object({
		latest: Semver.describe('pnpm latest version, e.g. 9.5.0'),
	}),
})

const PackageJson = z
	.object({
		packageManager: z.string().regex(/^pnpm@\d+\.\d+\.\d+$/),
	})
	.passthrough()

type MiseToml = z.infer<typeof MiseToml>
const MiseToml = z.object({
	tools: z
		.object({
			pnpm: Semver.describe('pnpm version, e.g. 9.5.0'),
		})
		.catchall(z.string()),
	alias: z.record(z.string(), z.string()),
})
