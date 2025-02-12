import { Command } from '@commander-js/extra-typings'

import { getRepoRoot } from '../path'
import { updatePnpm } from '../update-pnpm'

export const updateCmd = new Command('update')
	.description('Update things in the repo')
	.hook('preAction', () => {
		$.stdio = 'inherit'
		$.verbose = true
		cd(getRepoRoot())
	})

updateCmd
	.command('deps')
	.description('Update dependencies via syncpack')
	.action(async () => {
		await $`run-update-deps`
	})

updateCmd
	.command('pnpm')
	.description('Update pnpm version')
	.action(async () => {
		await updatePnpm()
		await $`mise up`
	})

updateCmd
	.command('turbo')
	.description('Update turbo version (must have clean working tree)')
	.action(async () => {
		await $`pnpx @turbo/codemod@latest update`
	})
