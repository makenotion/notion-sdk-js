import { auth } from "./auth";
import { hook } from "./hook";
export const createUnauthenticatedAuth = function createUnauthenticatedAuth(options) {
    if (!options || !options.reason) {
        throw new Error("[@octokit/auth-unauthenticated] No reason passed to createUnauthenticatedAuth");
    }
    return Object.assign(auth.bind(null, options.reason), {
        hook: hook.bind(null, options.reason),
    });
};
