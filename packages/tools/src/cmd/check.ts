import { Command } from '@commander-js/extra-typings'
import Table from 'cli-table3'

import { getRepoRoot } from '../path'
import { getOutcome } from '../proc'

export const checkCmd = new Command('check')
	.description(
		'Check for issues with deps/lint/types/format. If no options are provided, all checks are run.'
	)

	.option('-r, --root', 'Run checks from root of repo. Defaults to cwd', false)
	.option('-d, --deps', 'Check for dependency issues with Syncpack')
	.option('-l, --lint', 'Check for eslint issues')
	.option('-t, --types', 'Check for TypeScript issues')
	.option('-f, --format', 'Check for formatting issues with prettier')
	.option('-s, --spelling', 'Check for spelling issues')
	.option('-k, --links', 'Check for markdown link issues')

	.action(async ({ root, deps, lint, types, format, spelling, links }) => {
		const repoRoot = getRepoRoot()
		if (root) {
			cd(repoRoot)
		}
		// Run all if none are selected
		if (!deps && !lint && !types && !format && !spelling && !links) {
			deps = true
			lint = true
			types = true
			format = true
			spelling = true
			links = true
		}

		const cwd = process.cwd()
		const runFromRoot = cwd === repoRoot
		const cwdName = path.basename(cwd)

		const checks = {
			deps: ['syncpack', 'lint'],
			lint: ['turbo', 'check:lint'],
			format: 'prettier . --check --cache --ignore-unknown'.split(' '),
			types: ['turbo', 'check:types'],
			spelling: ['cspell', 'lint', '**/*'],
			links: 'git ls-files | grep md$ | xargs -n 1 markdown-link-check'.split(' '),
		} as const satisfies { [key: string]: string[] }

		type TableRow = [string, string, string, string]
		const table = new Table({
			head: [
				chalk.whiteBright('Name'),
				chalk.whiteBright('Command'),
				chalk.whiteBright('Outcome'),
				chalk.whiteBright('Ran From'),
			] satisfies TableRow,
		})

		$.stdio = 'inherit'
		$.verbose = true
		$.nothrow = true

		if (deps) {
			await within(async () => {
				cd(repoRoot) // Must be run from root
				const exitCode = await $`${checks.deps}`.exitCode
				table.push(['deps', `${checks.deps}`, getOutcome(exitCode), 'Root'] satisfies TableRow)
			})
		}

		if (lint) {
			const exitCode = await $`${checks.lint}`.exitCode
			table.push([
				'lint',
				checks.lint.join(' '),
				getOutcome(exitCode),
				runFromRoot ? 'Root' : `cwd (${cwdName})`,
			] satisfies TableRow)
		}

		if (types) {
			const exitCode = await $`${checks.types}`.exitCode
			table.push([
				'types',
				checks.types.join(' '),
				getOutcome(exitCode),
				runFromRoot ? 'Root' : `cwd (${cwdName})`,
			] satisfies TableRow)
		}

		if (format) {
			await within(async () => {
				cd(repoRoot) // Must be run from root
				const exitCode = await $`${checks.format}`.exitCode
				table.push([
					'format',
					checks.format.join(' '),
					getOutcome(exitCode),
					'Root',
				] satisfies TableRow)
			})
		}

		if (spelling) {
			await within(async () => {
				cd(repoRoot) // Must be run from root
				const exitCode = await $`${checks.spelling}`.exitCode
				table.push([
					'spelling',
					checks.spelling.join(' '),
					getOutcome(exitCode),
					'Root',
				] satisfies TableRow)
			})
		}

		if (links) {
			await within(async () => {
				cd(repoRoot) // Must be run from root
				const exitCode = await $`${checks.links}`.exitCode
				table.push([
					'links',
					checks.links.join(' '),
					getOutcome(exitCode),
					'Root',
				] satisfies TableRow)
			})
		}

		echo(table.toString())
	})
