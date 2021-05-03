import { githubAppJwt } from "universal-github-app-jwt";
export async function getAppAuthentication({ appId, privateKey, timeDifference, }) {
    const appAuthentication = await githubAppJwt({
        id: +appId,
        privateKey,
        now: timeDifference && Math.floor(Date.now() / 1000) + timeDifference,
    });
    return {
        type: "app",
        token: appAuthentication.token,
        appId: appAuthentication.appId,
        expiresAt: new Date(appAuthentication.expiration * 1000).toISOString(),
    };
}
