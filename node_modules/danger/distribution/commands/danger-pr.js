#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var debug_1 = require("../debug");
var jsome_1 = __importDefault(require("jsome"));
var Fake_1 = require("../ci_source/providers/Fake");
var pullRequestParser_1 = require("../platforms/pullRequestParser");
var fileUtils_1 = require("./utils/fileUtils");
var validateDangerfileExists_1 = __importDefault(require("./utils/validateDangerfileExists"));
var sharedDangerfileArgs_1 = __importDefault(require("./utils/sharedDangerfileArgs"));
var dslGenerator_1 = require("../runner/dslGenerator");
var runDangerSubprocess_1 = require("./utils/runDangerSubprocess");
var runner_1 = require("./ci/runner");
var platform_1 = require("../platforms/platform");
var d = debug_1.debug("pr");
var log = console.log;
commander_1.default
    .usage("[options] <pr_url>")
    .description("Emulate running Danger against an existing GitHub Pull Request.")
    .option("-J, --json", "Output the raw JSON that would be passed into `danger process` for this PR.")
    .option("-j, --js", "A more human-readable version of the JSON.")
    .on("--help", function () {
    log("\n");
    log("  Docs:");
    if (!process.env["DANGER_GITHUB_API_TOKEN"] && !process.env["DANGER_BITBUCKETSERVER_HOST"]) {
        log("");
        log("     You don't have a DANGER_GITHUB_API_TOKEN set up, this is optional, but TBH, you want to do this.");
        log("     Check out: http://danger.systems/js/guides/the_dangerfile.html#working-on-your-dangerfile");
        log("");
    }
    log("");
    log("    -> API Reference");
    log("       http://danger.systems/js/reference.html");
    log("");
    log("    -> Getting started:");
    log("       http://danger.systems/js/guides/getting_started.html");
    log("");
    log("    -> The Dangerfile");
    log("       http://danger.systems/js/guides/the_dangerfile.html");
});
sharedDangerfileArgs_1.default(commander_1.default).parse(process.argv);
var app = commander_1.default;
var customProcess = !!app.process;
if (commander_1.default.args.length === 0) {
    console.error("Please include a PR URL to run against");
    process.exitCode = 1;
}
else {
    var customHost_1 = process.env["DANGER_GITHUB_HOST"] || process.env["DANGER_BITBUCKETSERVER_HOST"] || "github";
    // Allow an ambiguous amount of args to find the PR reference
    var findPR = commander_1.default.args.find(function (a) { return a.includes(customHost_1); });
    if (!findPR) {
        console.error("Could not find an arg which mentioned GitHub or BitBucket Server.");
        process.exitCode = 1;
    }
    else {
        var pr = pullRequestParser_1.pullRequestParser(findPR);
        if (!pr) {
            console.error("Could not get a repo and a PR number from your PR: " + findPR + ", bad copy & paste?");
            process.exitCode = 1;
        }
        else {
            // TODO: Use custom `fetch` in GitHub that stores and uses local cache if PR is closed, these PRs
            //       shouldn't change often and there is a limit on API calls per hour.
            var isJSON = app.js || app.json;
            var note = isJSON ? console.error : console.log;
            note("Starting Danger PR on " + pr.repo + "#" + pr.pullRequestNumber);
            if (customProcess || isJSON || validateDangerfileExists_1.default(fileUtils_1.dangerfilePath(commander_1.default))) {
                if (!customProcess) {
                    d("executing dangerfile at " + fileUtils_1.dangerfilePath(commander_1.default));
                }
                var source = new Fake_1.FakeCI({ DANGER_TEST_REPO: pr.repo, DANGER_TEST_PR: pr.pullRequestNumber });
                var platform = platform_1.getPlatformForEnv(process.env, source, /* requireAuth */ false);
                if (isJSON) {
                    d("getting just the JSON/JS DSL");
                    runHalfProcessJSON(platform, source);
                }
                else {
                    d("running process separated Danger");
                    // Always post to STDOUT in `danger-pr`
                    app.textOnly = true;
                    // Can't send these to `danger runner`
                    delete app.js;
                    delete app.json;
                    runner_1.runRunner(app, { source: source, platform: platform, additionalEnvVars: { DANGER_LOCAL_NO_CI: "yep" } });
                }
            }
        }
    }
}
// Run the first part of a Danger Process and output the JSON to CLI
function runHalfProcessJSON(platform, source) {
    return __awaiter(this, void 0, void 0, function () {
        var dangerDSL, processInput, output, dsl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dslGenerator_1.jsonDSLGenerator(platform, source, commander_1.default)
                    // Truncate the access token
                ];
                case 1:
                    dangerDSL = _a.sent();
                    // Truncate the access token
                    if (dangerDSL.settings.github && dangerDSL.settings.github.accessToken) {
                        dangerDSL.settings.github.accessToken = dangerDSL.settings.github.accessToken.substring(0, 4) + "...";
                    }
                    processInput = runDangerSubprocess_1.prepareDangerDSL(dangerDSL);
                    output = JSON.parse(processInput);
                    dsl = { danger: output };
                    // See https://github.com/Javascipt/Jsome/issues/12
                    if (app.json) {
                        process.stdout.write(JSON.stringify(dsl, null, 2));
                    }
                    else if (app.js) {
                        jsome_1.default(dsl);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=danger-pr.js.map