# Check an SDK change

Use this guide to test a change before opening a pull request. You need Node.js 18 or later and Git.

## Install and test

From the repo root, install the locked dependencies:

```sh
npm ci
```

Make your change and add tests for it. If it needs changes to generated endpoint files, ask a maintainer. The schema and generator are internal to Notion. See [the source file rules](AGENTS.md#source-files).

Run the local checks:

```sh
npm run build
npm run lint
npm test
```

## Check SDK compatibility

Check that the exports, method inputs, and response types available from `@notionhq/client` still work.

Fetch the latest base branch and create a separate checkout in a new temporary directory:

```sh
git fetch origin main
compat_dir=$(mktemp -d)
git worktree add --detach "$compat_dir/baseline" origin/main
npm run check:compatibility -- "$compat_dir/baseline/src/index.ts"
```

Keep the baseline outside this repo so lint and tests do not scan it. For a pull request that targets another branch, use that branch instead of `main`.

If the check reports a removed or incompatible export, restore the old contract and add a regression test. If the change is intentional, get review for the contract and release version change. See [the compatibility rules](AGENTS.md#compatibility-rules).

Remove the temporary checkout when done:

```sh
git worktree remove "$compat_dir/baseline"
rmdir "$compat_dir"
```

## Open the pull request

Describe the change and record the checks you ran. Wait for CI to pass on the final commit before merging.
