import * as https from 'https';

type HttpMethod = 'get'|'GET'|'post'|'POST'|'put'|'PUT'|'patch'|'PATCH'|'delete'|'DELETE';

export default interface RequestOptions<TData = any, TParams = object> {
    url: string;
    method?: HttpMethod;
    baseUrl?: string;
    qs?: TParams;
    body?: TData;
    headers?: object;
    httpsAgent?: https.Agent;
}
