const REGEX_ABUSE_LIMIT_MESSAGE = /\babuse\b/i;
export function isAbuseLimitError(error) {
    if (error.status !== 403) {
        return false;
    }
    return REGEX_ABUSE_LIMIT_MESSAGE.test(error.message);
}
