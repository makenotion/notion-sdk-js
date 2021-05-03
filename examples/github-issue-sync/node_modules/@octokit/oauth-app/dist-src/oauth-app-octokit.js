import { Octokit } from "@octokit/core";
import { getUserAgent } from "universal-user-agent";
import { VERSION } from "./version";
export const OAuthAppOctokit = Octokit.defaults({
    userAgent: `octokit-oauth-app.js/${VERSION} ${getUserAgent()}`,
});
