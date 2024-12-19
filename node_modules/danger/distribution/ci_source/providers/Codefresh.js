"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ci_source_helpers_1 = require("../ci_source_helpers");
/**
 *  ### CI Setup
 *
 *  To set up Danger on Codefresh, create a freestyle step in your Codefresh yaml configuration:
 *
 *  ```yml
 *  Danger:
 *    title: Run Danger
 *    image: node:latest
 *    working_directory: ${{main_clone}}
 *    entry_point: '/bin/bash'
 *    cmd:
 *      - '-ce'
 *      - |
 *        npm install -g yarn
 *        yarn add danger --dev
 *        yarn danger ci --failOnErrors
 *    when:
 *      steps:
 *        - name: main_clone
 *          on:
 *            - success
 *  ```
 *
 *  The `failOnErrors` option is required in order to ensure that the step fails properly when Danger fails. If you don't wnat this behavior, you can remove this option.
 *
 *  Don't forget to add the `DANGER_GITHUB_API_TOKEN` variable to your pipeline settings so that Danger can properly post comments to your pull request.
 *
 */
var Codefresh = /** @class */ (function () {
    function Codefresh(env) {
        this.env = env;
    }
    Object.defineProperty(Codefresh.prototype, "name", {
        get: function () {
            return "Codefresh";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codefresh.prototype, "isCI", {
        get: function () {
            return ci_source_helpers_1.ensureEnvKeysExist(this.env, ["CF_BUILD_ID", "CF_BUILD_URL"]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codefresh.prototype, "isPR", {
        get: function () {
            return (ci_source_helpers_1.ensureEnvKeysExist(this.env, ["CF_PULL_REQUEST_NUMBER"]) &&
                ci_source_helpers_1.ensureEnvKeysAreInt(this.env, ["CF_PULL_REQUEST_NUMBER"]));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codefresh.prototype, "pullRequestID", {
        get: function () {
            if (this.env.CF_PULL_REQUEST_NUMBER) {
                return this.env.CF_PULL_REQUEST_NUMBER;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codefresh.prototype, "repoSlug", {
        get: function () {
            var owner = this.env.CF_REPO_OWNER;
            var reponame = this.env.CF_REPO_NAME;
            return owner && reponame ? owner + "/" + reponame : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Codefresh.prototype, "ciRunURL", {
        get: function () {
            return this.env.CF_BUILD_URL;
        },
        enumerable: true,
        configurable: true
    });
    return Codefresh;
}());
exports.Codefresh = Codefresh;
//# sourceMappingURL=Codefresh.js.map