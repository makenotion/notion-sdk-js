import { createAppAuth } from "@octokit/auth-app";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
import { Webhooks } from "@octokit/webhooks";
export function webhooks(appOctokit, options
// Explict return type for better debugability and performance,
// see https://github.com/octokit/app.js/pull/201
) {
    return new Webhooks({
        secret: options.secret,
        transform: async (event) => {
            if (!("installation" in event.payload) ||
                typeof event.payload.installation !== "object") {
                const octokit = new appOctokit.constructor({
                    authStrategy: createUnauthenticatedAuth,
                    auth: {
                        reason: `"installation" key missing in webhook event payload`,
                    },
                });
                return {
                    ...event,
                    octokit: octokit,
                };
            }
            const installationId = event.payload.installation.id;
            const octokit = (await appOctokit.auth({
                type: "installation",
                installationId,
                factory(auth) {
                    return new auth.octokit.constructor({
                        ...auth.octokitOptions,
                        authStrategy: createAppAuth,
                        ...{
                            auth: {
                                ...auth,
                                installationId,
                            },
                        },
                    });
                },
            }));
            return {
                ...event,
                octokit: octokit,
            };
        },
    });
}
