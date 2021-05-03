import { GetTokenOptions, Token } from "./types";
export declare function getToken({ privateKey, payload }: GetTokenOptions): Promise<Token>;
