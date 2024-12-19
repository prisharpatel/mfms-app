"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ci_source_helpers_1 = require("../ci_source_helpers");
var fs_1 = require("fs");
// https://developer.github.com/actions/
/**
 * ### CI Setup
 *
 * To use Danger JS with GitHub Actions, you'll need want to set up
 * Danger to run on a `pull_request` webhook. To do this, you'll need
 * to add/amend your repo's workflow file with something like:
 *
 * ```
 * workflow "Dangerfile JS Eval" {
 *   on = "pull_request"
 *   resolves = "Danger JS"
 * }
 *
 * action "Danger JS" {
 *   uses = "danger/danger-js"
 *   secrets = ["GITHUB_TOKEN"]
 * }
 * ```
 *
 * You can pass additional CLI to Danger JS in an action via:
 *
 * ```
 * action "Danger JS" {
 *   [...]
 *   args = "--dangerfile artsy/peril-settings/org/allPRs.ts"
 * }
 * ```
 *
 * This runs the file [`org/allPRs.ts`](https://github.com/artsy/peril-settings/blob/master/org/allPRs.ts)
 * from the repo [artsy/peril-settings](https://github.com/artsy/peril-settings).
 *
 * ### Token Setup
 *
 * You need to make sure that the secret `"GITHUB_TOKEN"` is
 * enabled in your workspace. This is so that Danger can connect
 * to GitHub.
 *
 * ```
 * action "Danger JS" {
 *   uses = "danger/danger-js"
 *   secrets = ["GITHUB_TOKEN"]
 * }
 * ```
 *
 */
var GitHubActions = /** @class */ (function () {
    function GitHubActions(env) {
        this.env = env;
        if (fs_1.existsSync("/github/workflow/event.json")) {
            var event_1 = fs_1.readFileSync("/github/workflow/event.json", "utf8");
            this.event = JSON.parse(event_1);
        }
    }
    Object.defineProperty(GitHubActions.prototype, "name", {
        get: function () {
            return "GitHub Actions";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "isCI", {
        get: function () {
            return ci_source_helpers_1.ensureEnvKeysExist(this.env, ["GITHUB_WORKFLOW"]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "isPR", {
        get: function () {
            // This one is complicated, because it needs to not *just* support PRs
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "useEventDSL", {
        get: function () {
            // Support event based PR runs
            return this.env.GITHUB_EVENT_NAME !== "pull_request";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "pullRequestID", {
        get: function () {
            if (this.env.GITHUB_EVENT_NAME === "pull_request") {
                return this.event.pull_request.number;
            }
            throw new Error("pullRequestID was called on GitHubActions when it wasn't a PR");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GitHubActions.prototype, "repoSlug", {
        get: function () {
            if (this.env.GITHUB_EVENT_NAME === "pull_request") {
                return this.event.pull_request.base.repo.full_name;
            }
            throw new Error("repoSlug was called on GitHubActions when it wasn't a PR");
        },
        enumerable: true,
        configurable: true
    });
    return GitHubActions;
}());
exports.GitHubActions = GitHubActions;
//# sourceMappingURL=GitHubActions.js.map