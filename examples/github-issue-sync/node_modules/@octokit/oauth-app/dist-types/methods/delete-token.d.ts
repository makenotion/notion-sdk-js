import * as OAuthMethods from "@octokit/oauth-methods";
import { State } from "../types";
export declare type DeleteTokenOptions = {
    token: string;
};
export declare function deleteTokenWithState(state: State, options: DeleteTokenOptions): Promise<OAuthMethods.DeleteTokenResponse>;
export interface DeleteTokenInterface {
    (options: DeleteTokenOptions): Promise<OAuthMethods.DeleteTokenResponse>;
}
