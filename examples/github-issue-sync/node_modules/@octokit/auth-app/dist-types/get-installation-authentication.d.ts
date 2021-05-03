import { InstallationAuthOptions, InstallationAccessTokenAuthentication, RequestInterface, State } from "./types";
export declare function getInstallationAuthentication(state: State, options: InstallationAuthOptions, customRequest?: RequestInterface): Promise<InstallationAccessTokenAuthentication>;
