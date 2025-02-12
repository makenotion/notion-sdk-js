import * as find from 'empathic/find'
import memoizeOne from 'memoize-one'
import { z } from 'zod'

export const getRepoRoot = memoizeOne(() => {
	const pnpmLock = z
		.string()
		.trim()
		.startsWith('/')
		.endsWith('/pnpm-lock.yaml')
		.parse(find.up('pnpm-lock.yaml'))
	return path.dirname(pnpmLock)
})
