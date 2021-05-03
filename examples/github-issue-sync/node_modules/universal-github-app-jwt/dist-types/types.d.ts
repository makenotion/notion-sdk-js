export declare type PrivateKey = string;
export declare type AppId = number;
export declare type Expiration = number;
export declare type Token = string;
export declare type Options = {
    id: AppId;
    privateKey: PrivateKey;
    now?: number;
};
export declare type Result = {
    appId: AppId;
    expiration: Expiration;
    token: Token;
};
export declare type Payload = {
    iat: number;
    exp: number;
    iss: number;
};
export declare type GetTokenOptions = {
    privateKey: PrivateKey;
    payload: Payload;
};
