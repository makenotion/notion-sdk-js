import { composePaginateRest } from "@octokit/plugin-paginate-rest";
import { getInstallationOctokit } from "./get-installation-octokit";
export function eachInstallationFactory(app) {
    return Object.assign(eachInstallation.bind(null, app), {
        iterator: eachInstallationIterator.bind(null, app),
    });
}
export async function eachInstallation(app, callback) {
    const i = eachInstallationIterator(app)[Symbol.asyncIterator]();
    let result = await i.next();
    while (!result.done) {
        await callback(result.value);
        result = await i.next();
    }
}
export function eachInstallationIterator(app) {
    return {
        async *[Symbol.asyncIterator]() {
            const iterator = composePaginateRest.iterator(app.octokit, "GET /app/installations");
            for await (const { data: installations } of iterator) {
                for (const installation of installations) {
                    const installationOctokit = await getInstallationOctokit(app, installation.id);
                    yield { octokit: installationOctokit, installation };
                }
            }
        },
    };
}
