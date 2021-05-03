// @ts-ignore to address #245
import AggregateError from "aggregate-error";
export function getPayload(request) {
    // If request.body already exists we can stop here
    // See https://github.com/octokit/webhooks.js/pull/23
    if (request.body)
        return Promise.resolve(request.body);
    return new Promise((resolve, reject) => {
        let data = "";
        request.setEncoding("utf8");
        // istanbul ignore next
        request.on("error", (error) => reject(new AggregateError([error])));
        request.on("data", (chunk) => (data += chunk));
        request.on("end", () => {
            try {
                resolve(JSON.parse(data));
            }
            catch (error) {
                error.message = "Invalid JSON";
                error.status = 400;
                reject(new AggregateError([error]));
            }
        });
    });
}
