"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ci_source_helpers_1 = require("../ci_source_helpers");
/**
 * CI Setup
 *
 * In CodeBuild, make sure to correctly forward CODEBUILD_BUILD_ID, CODEBUILD_SOURCE_VERSION, CODEBUILD_SOURCE_REPO_URL and DANGER_GITHUB_API_TOKEN.
 *
 * Token Setup
 *
 * Add your `DANGER_GITHUB_API_TOKEN` to your project. Edit -> Environment -> Additional configuration -> Create a parameter
 *
 */
var CodeBuild = /** @class */ (function () {
    function CodeBuild(env) {
        this.env = env;
    }
    Object.defineProperty(CodeBuild.prototype, "name", {
        get: function () {
            return "CodeBuild";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeBuild.prototype, "isCI", {
        get: function () {
            return ci_source_helpers_1.ensureEnvKeysExist(this.env, ["CODEBUILD_BUILD_ID"]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeBuild.prototype, "isPR", {
        get: function () {
            var mustHave = ["CODEBUILD_BUILD_ID", "CODEBUILD_SOURCE_VERSION", "CODEBUILD_SOURCE_REPO_URL"];
            return ci_source_helpers_1.ensureEnvKeysExist(this.env, mustHave) && this._isPRRequest();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeBuild.prototype, "pullRequestID", {
        get: function () {
            return this.env.CODEBUILD_SOURCE_VERSION.split("/")[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeBuild.prototype, "repoSlug", {
        get: function () {
            return this._prParseUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CodeBuild.prototype, "repoURL", {
        get: function () {
            return this.env.CODEBUILD_SOURCE_REPO_URL;
        },
        enumerable: true,
        configurable: true
    });
    CodeBuild.prototype._isPRRequest = function () {
        var isPRSource = this.env.CODEBUILD_SOURCE_VERSION.split("/")[0] === "pr" ? true : false;
        var isPRIdInt = !isNaN(parseInt(this.env.CODEBUILD_SOURCE_VERSION.split("/")[1]));
        return isPRSource && isPRIdInt;
    };
    CodeBuild.prototype._prParseUrl = function () {
        var prUrl = this.env.CODEBUILD_SOURCE_REPO_URL || "";
        var regexp = new RegExp("([/:])([^/]+/[^/.]+)(?:.git)?$");
        var matches = prUrl.match(regexp);
        return matches ? matches[2] : "";
    };
    return CodeBuild;
}());
exports.CodeBuild = CodeBuild;
//# sourceMappingURL=CodeBuild.js.map