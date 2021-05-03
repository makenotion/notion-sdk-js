#!/usr/bin/env node

const spawn = require('child_process').spawnSync;
const path = require('path');

const filesToCheck = ['*.h', '*.cc'];
const CLANG_FORMAT_START = process.env.CLANG_FORMAT_START || 'master';

function main(args) {
  let clangFormatPath = path.dirname(require.resolve('clang-format'));
  const options = ['--binary=node_modules/.bin/clang-format', '--style=file'];

  const gitClangFormatPath = path.join(clangFormatPath,
    'bin/git-clang-format');
  const result = spawn('python', [
    gitClangFormatPath,
    ...options,
    '--diff',
    CLANG_FORMAT_START,
    'HEAD',
    ...filesToCheck
  ], { encoding: 'utf-8' });

  if (result.error) {
    console.error('Error running git-clang-format:', result.error);
    return 2;
  }

  const clangFormatOutput = result.stdout.trim();
  if (clangFormatOutput !== '' &&
      clangFormatOutput !== ('no modified files to format') &&
      clangFormatOutput !== ('clang-format did not modify any files')) {
    console.error(clangFormatOutput);
    const fixCmd = '"npm run lint:fix"';
    console.error(`
      ERROR: please run ${fixCmd} to format changes in your commit
        Note that when running the command locally, please keep your local
        master branch and working branch up to date with nodejs/node-addon-api
        to exclude un-related complains.
        Or you can run "env CLANG_FORMAT_START=upstream/master ${fixCmd}".`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}
