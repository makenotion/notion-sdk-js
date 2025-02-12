export function getOutcome(exitCode: number | null) {
	if (exitCode === 0) {
		return chalk.green('Success!')
	} else {
		return chalk.red(`Failed with code: ${exitCode}`)
	}
}
