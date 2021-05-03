export function getOAuthClientCode() {
    return `import { Octokit: Core } from "https://cdn.pika.dev/@octokit/core";
    
    export const Octokit = Core.defaults({
      oauth: {}
    })`;
}
