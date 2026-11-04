# Publish a release

Use the Increment Version workflow to create a version-bump PR. Merging that PR publishes `@notionhq/client` to npm automatically. Publish the GitHub release notes after the package is available on npm.

You need permission to run repository workflows and approve or merge pull requests.

## Create and merge the version bump

1. Merge the changes you want to release into `main` and wait for CI to pass.
2. Open [Increment Version](https://github.com/makenotion/notion-sdk-js/actions/workflows/increment-version.yml), select **Run workflow**, and use the `main` branch.
3. Choose `patch`, `minor`, or `major` for `version_type`, then run the workflow. For planned public API contract changes, use a minor or major release. See the [compatibility rules](AGENTS.md#compatibility-rules).
4. Wait for the workflow to create a PR titled `Bump version to v<version>`.
5. Review the version changes in `package.json` and `package-lock.json`. If GitHub holds the PR's CI runs for approval, approve those runs.
6. Wait for the required checks to pass and get the required PR approval. The workflow creates the PR as `github-actions[bot]`, so you can approve it if you have review permission.
7. Squash-merge the PR with its generated title. Keep `Bump version to` in the merge commit message: the publish workflow uses that text to create the release tag.

## Verify npm publication

1. Open [Publish Package](https://github.com/makenotion/notion-sdk-js/actions/workflows/publish.yml) and find the run for the merged version-bump commit.
2. Wait for the workflow to pass. It builds, checks, and publishes the package with provenance, then creates the `v<version>` tag.
3. Check that npm reports the version you released:

   ```sh
   npm view @notionhq/client version
   ```

   If npm still reports the previous version, wait a few minutes and check again. npm can accept a publish before the package becomes available.

## Publish the GitHub release notes

1. Open [New release](https://github.com/makenotion/notion-sdk-js/releases/new), select the existing `v<version>` tag, and use that tag as the release title.
2. Write the notes in the [recent release format](https://github.com/makenotion/notion-sdk-js/releases). Describe consumer-facing changes, link the relevant PRs, and put breaking changes first with upgrade instructions.
3. Add the comparison link from the previous release tag to the new tag and the npm package link for the new version.
4. Publish the release and confirm the notes appear on the [releases page](https://github.com/makenotion/notion-sdk-js/releases).
