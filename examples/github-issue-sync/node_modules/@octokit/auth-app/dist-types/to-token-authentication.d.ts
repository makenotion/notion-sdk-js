import { CacheData, InstallationAccessTokenAuthentication, WithInstallationId } from "./types";
export declare function toTokenAuthentication({ installationId, token, createdAt, expiresAt, repositorySelection, permissions, repositoryIds, singleFileName, }: CacheData & WithInstallationId): InstallationAccessTokenAuthentication;
