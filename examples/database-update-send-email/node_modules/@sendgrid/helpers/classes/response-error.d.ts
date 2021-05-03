export default class ResponseError extends Error {
    code: number;
    message: string;
    response: {
        headers: { [key: string]: string; };
        body: string;
    };
}