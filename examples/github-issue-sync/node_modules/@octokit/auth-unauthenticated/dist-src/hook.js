import { isRateLimitError } from "./is-rate-limit-error";
import { isAbuseLimitError } from "./is-abuse-limit-error";
export async function hook(reason, request, route, parameters) {
    const endpoint = request.endpoint.merge(route, parameters);
    return request(endpoint).catch((error) => {
        if (error.status === 404) {
            error.message = `Not found. May be due to lack of authentication. Reason: ${reason}`;
            throw error;
        }
        if (isRateLimitError(error)) {
            error.message = `API rate limit exceeded. This maybe caused by the lack of authentication. Reason: ${reason}`;
            throw error;
        }
        if (isAbuseLimitError(error)) {
            error.message = `You have triggered an abuse detection mechanism. This maybe caused by the lack of authentication. Reason: ${reason}`;
            throw error;
        }
        if (error.status === 401) {
            error.message = `Unauthorized. "${endpoint.method} ${endpoint.url}" failed most likely due to lack of authentication. Reason: ${reason}`;
            throw error;
        }
        if (error.status >= 400 && error.status < 500) {
            error.message = error.message.replace(/\.?$/, `. May be caused by lack of authentication (${reason}).`);
        }
        throw error;
    });
}
