export declare function sign(secret: string, data: string): Promise<string>;
export declare function verify(secret: string, data: string, signature: string): Promise<boolean>;
