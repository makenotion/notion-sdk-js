import { Command } from '@commander-js/extra-typings'
import Table from 'cli-table3'

import { getRepoRoot } from '../path'
import { getOutcome } from '../proc'

export const fixCmd = new Command('fix')
	.description('Fix deps/lint/format issues. If no options are provided, all fixes are run.')

	.option('-r, --root', 'Run fixes from root of repo. Defaults to cwd', false)
	.option('-d, --deps', 'Fix dependency versions with syncpack')
	.option('-l, --lint', 'Fix eslint issues')
	.option('-f, --format', 'Format code with prettier')

	.action(async ({ root, deps, lint, format }) => {
		const repoRoot = getRepoRoot()
		if (root) {
			cd(repoRoot)
		}
		// Run all if none are selected
		if (!deps && !lint && !format) {
			deps = true
			lint = true
			format = true
		}

		const cwd = process.cwd()
		const runFromRoot = cwd === repoRoot
		const cwdName = path.basename(cwd)

		const fixes = {
			deps: ['run-fix-deps'],
			lint: ['FIX_ESLINT=1', 'turbo', 'check:lint'],
			format: ['runx', 'prettier', 'format'],
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
				const exitCode = await $`${fixes.deps}`.exitCode
				table.push(['deps', fixes.deps.join(' '), getOutcome(exitCode), 'Root'] satisfies TableRow)
			})
		}

		if (lint) {
			const exitCode = await $`${fixes.lint}`.exitCode
			table.push([
				'lint',
				fixes.lint.join(' '),
				getOutcome(exitCode),
				runFromRoot ? 'Root' : `cwd (${cwdName})`,
			] satisfies TableRow)
		}

		if (format) {
			await within(async () => {
				cd(repoRoot) // Must be run from root
				const exitCode = await $`${fixes.format}`.exitCode
				table.push([
					'format',
					fixes.format.join(' '),
					getOutcome(exitCode),
					'Root',
				] satisfies TableRow)
			})
		}

		echo(table.toString())
	})
