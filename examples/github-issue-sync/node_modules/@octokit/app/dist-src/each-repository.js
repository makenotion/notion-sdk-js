import { composePaginateRest } from "@octokit/plugin-paginate-rest";
export function eachRepositoryFactory(app) {
    return Object.assign(eachRepository.bind(null, app), {
        iterator: eachRepositoryIterator.bind(null, app),
    });
}
export async function eachRepository(app, queryOrCallback, callback) {
    const i = eachRepositoryIterator(app, callback ? queryOrCallback : undefined)[Symbol.asyncIterator]();
    let result = await i.next();
    while (!result.done) {
        if (callback) {
            await callback(result.value);
        }
        else {
            await queryOrCallback(result.value);
        }
        result = await i.next();
    }
}
function singleInstallationIterator(app, installationId) {
    return {
        async *[Symbol.asyncIterator]() {
            yield {
                octokit: await app.getInstallationOctokit(installationId),
            };
        },
    };
}
export function eachRepositoryIterator(app, query) {
    return {
        async *[Symbol.asyncIterator]() {
            const iterator = query
                ? singleInstallationIterator(app, query.installationId)
                : app.eachInstallation.iterator();
            for await (const { octokit } of iterator) {
                const repositoriesIterator = composePaginateRest.iterator(octokit, "GET /installation/repositories");
                for await (const { data: repositories } of repositoriesIterator) {
                    for (const repository of repositories) {
                        yield { octokit: octokit, repository };
                    }
                }
            }
        },
    };
}
