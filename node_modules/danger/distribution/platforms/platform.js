"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GitHub_1 = require("./GitHub");
var GitHubAPI_1 = require("./github/GitHubAPI");
var BitBucketServer_1 = require("./BitBucketServer");
var BitBucketServerAPI_1 = require("./bitbucket_server/BitBucketServerAPI");
var chalk_1 = __importDefault(require("chalk"));
var FakePlatform_1 = require("./FakePlatform");
/**
 * Pulls out a platform for Danger to communicate on based on the environment
 * @param {Env} env The environment.
 * @param {CISource} source The existing source, to ensure they can run against each other
 * @returns {Platform} returns a platform if it can be supported
 */
function getPlatformForEnv(env, source, requireAuth) {
    if (requireAuth === void 0) { requireAuth = true; }
    // BitBucket Server
    var bbsHost = env["DANGER_BITBUCKETSERVER_HOST"];
    if (bbsHost) {
        var api = new BitBucketServerAPI_1.BitBucketServerAPI({
            pullRequestID: source.pullRequestID,
            repoSlug: source.repoSlug,
        }, BitBucketServerAPI_1.bitbucketServerRepoCredentialsFromEnv(env));
        var bbs = new BitBucketServer_1.BitBucketServer(api);
        return bbs;
    }
    // They need to set the token up for GitHub actions to work
    if (env["GITHUB_EVENT_NAME"] && !env["GITHUB_TOKEN"]) {
        console.error("You need to add GITHUB_TOKEN to your Danger action in the workflow:\n\n    action \"" + env["GITHUB_ACTION"] + "\" {\n    " + chalk_1.default.green('+  secrets = ["GITHUB_TOKEN"]"') + "\n    }");
    }
    // GitHub Platform
    var ghToken = env["DANGER_GITHUB_API_TOKEN"] || env["GITHUB_TOKEN"];
    if (ghToken || !requireAuth) {
        if (!ghToken) {
            console.log("You don't have a DANGER_GITHUB_API_TOKEN set up, this is optional, but TBH, you want to do this");
            console.log("Check out: http://danger.systems/js/guides/the_dangerfile.html#working-on-your-dangerfile");
        }
        var api = new GitHubAPI_1.GitHubAPI(source, ghToken);
        var github = GitHub_1.GitHub(api);
        return github;
    }
    // Support automatically returning a fake platform if you pass a Fake CI
    if (source.name === "Fake Testing CI") {
        return new FakePlatform_1.FakePlatform();
    }
    console.error("The DANGER_GITHUB_API_TOKEN/DANGER_BITBUCKETSERVER_HOST environmental variable is missing");
    console.error("Without an api token, danger will be unable to comment on a PR");
    throw new Error("Cannot use authenticated API requests.");
}
exports.getPlatformForEnv = getPlatformForEnv;
//# sourceMappingURL=platform.js.map