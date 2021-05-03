export const createLogger = (logger) => ({
    debug: () => { },
    info: () => { },
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    ...logger,
});
