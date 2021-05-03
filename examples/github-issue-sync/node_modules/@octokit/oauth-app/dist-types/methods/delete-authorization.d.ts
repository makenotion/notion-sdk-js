import * as OAuthMethods from "@octokit/oauth-methods";
import { State } from "../types";
export declare type DeleteAuthorizationOptions = {
    token: string;
};
export declare function deleteAuthorizationWithState(state: State, options: DeleteAuthorizationOptions): Promise<OAuthMethods.DeleteAuthorizationResponse>;
export interface DeleteAuthorizationInterface {
    (options: DeleteAuthorizationOptions): Promise<OAuthMethods.DeleteAuthorizationResponse>;
}
