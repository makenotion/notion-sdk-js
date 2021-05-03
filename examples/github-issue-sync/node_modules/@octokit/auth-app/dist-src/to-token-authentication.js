export function toTokenAuthentication({ installationId, token, createdAt, expiresAt, repositorySelection, permissions, repositoryIds, singleFileName, }) {
    return Object.assign({
        type: "token",
        tokenType: "installation",
        token,
        installationId,
        permissions,
        createdAt,
        expiresAt,
        repositorySelection,
    }, repositoryIds ? { repositoryIds } : null, singleFileName ? { singleFileName } : null);
}
