import { createAppAuth } from "@octokit/auth-app";
export async function getInstallationOctokit(app, installationId) {
    return app.octokit.auth({
        type: "installation",
        installationId: installationId,
        factory(auth) {
            const options = {
                ...auth.octokitOptions,
                authStrategy: createAppAuth,
                ...{ auth: { ...auth, installationId: installationId } },
            };
            return new auth.octokit.constructor(options);
        },
    });
}
