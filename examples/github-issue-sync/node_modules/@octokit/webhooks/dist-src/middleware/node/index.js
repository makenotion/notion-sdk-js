import { createLogger } from "../../createLogger";
import { middleware } from "./middleware";
import { onUnhandledRequestDefault } from "./on-unhandled-request-default";
export function createNodeMiddleware(webhooks, { path = "/api/github/webhooks", onUnhandledRequest = onUnhandledRequestDefault, log = createLogger(), } = {}) {
    return middleware.bind(null, webhooks, {
        path,
        onUnhandledRequest,
        log,
    });
}
