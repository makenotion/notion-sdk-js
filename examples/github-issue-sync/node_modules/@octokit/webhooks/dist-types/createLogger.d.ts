export interface Logger {
    debug: (...data: any[]) => void;
    info: (...data: any[]) => void;
    warn: (...data: any[]) => void;
    error: (...data: any[]) => void;
}
export declare const createLogger: (logger?: Partial<Logger> | undefined) => Logger;
