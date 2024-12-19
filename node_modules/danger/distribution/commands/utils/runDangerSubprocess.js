"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("../../debug");
var path_1 = require("path");
var child_process_1 = require("child_process");
var jsonToDSL_1 = require("../../runner/jsonToDSL");
var reporting_1 = require("./reporting");
var fs_1 = require("fs");
var os_1 = require("os");
var d = debug_1.debug("runDangerSubprocess");
// If a sub-process passes this to stdout then danger-js will pass
// the DSL back to the process
var messageToSendDSL = "danger://send-dsl";
// Sanitizes the DSL so for sending via STDOUT
exports.prepareDangerDSL = function (dangerDSL) {
    if (dangerDSL.github && dangerDSL.github.api) {
        delete dangerDSL.github.api;
    }
    var dangerJSONOutput = { danger: dangerDSL };
    return JSON.stringify(dangerJSONOutput, null, "  ") + "\n";
};
// Runs the Danger process
exports.runDangerSubprocess = function (subprocessName, dslJSON, exec, config) {
    var processName = subprocessName[0];
    var args = subprocessName;
    var results = null;
    args.shift(); // mutate and remove the first element
    var processDisplayName = path_1.basename(processName);
    var dslJSONString = exports.prepareDangerDSL(dslJSON);
    d("Running sub-process: " + processDisplayName + " - " + args);
    var child = child_process_1.spawn(processName, args, { env: __assign({}, process.env, config.additionalEnvVars) });
    var sendDSLToSubprocess = function () {
        if (exec.options.passURLForDSL) {
            var resultsPath = path_1.join(os_1.tmpdir(), "danger-dsl.json");
            fs_1.writeFileSync(resultsPath, dslJSONString, "utf8");
            var url = "danger://dsl/" + resultsPath;
            d("Started passing in STDIN via the URL: " + url);
            child.stdin.write(url);
            child.stdin.end();
            d("Passed DSL in via STDIN");
        }
        else {
            d("Started passing in STDIN");
            child.stdin.write(dslJSONString);
            child.stdin.end();
            d("Passed DSL in via STDIN");
        }
    };
    // Initial sending of the DSL
    sendDSLToSubprocess();
    var allLogs = "";
    child.stdout.on("data", function (data) { return __awaiter(_this, void 0, void 0, function () {
        var stdout, maybeJSON, maybeJSONURL, withoutURLs, url;
        return __generator(this, function (_a) {
            stdout = data.toString();
            allLogs += stdout;
            // Provide a way for a process to request the DSL
            // if they missed the first go.
            if (stdout.includes(messageToSendDSL)) {
                sendDSLToSubprocess();
            }
            maybeJSON = getJSONFromSTDOUT(stdout);
            maybeJSONURL = getJSONURLFromSTDOUT(stdout);
            withoutURLs = data
                .toString()
                .replace(maybeJSON, "")
                .replace(maybeJSONURL + "\n", "")
                .replace(maybeJSONURL, "")
                .replace(messageToSendDSL + "\n", "")
                .replace(messageToSendDSL, "");
            console.log(withoutURLs);
            // Pass it back to the user
            if (!results && maybeJSONURL) {
                d("Got JSON URL from STDOUT, results are at: \n" + maybeJSONURL);
                url = maybeJSONURL.replace("danger-results:/", "");
                if (!fs_1.existsSync(url)) {
                    // prettier-ignore
                    throw new Error("Process '" + subprocessName.join(" ") + "' reported that its JSON results could be found at " + url + ", but the file was missing. The STDOUT was: " + stdout);
                }
                results = JSON.parse(fs_1.readFileSync(url, "utf8"));
            }
            else if (!results && maybeJSON) {
                d("Got JSON results from STDOUT, results: \n" + maybeJSON);
                results = JSON.parse(maybeJSON);
            }
            return [2 /*return*/];
        });
    }); });
    child.stderr.on("data", function (data) {
        if (data.toString().trim().length !== 0) {
            console.log(data.toString());
        }
    });
    child.on("close", function (code) { return __awaiter(_this, void 0, void 0, function () {
        var failResults, danger;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    d("child process exited with code " + code);
                    // Submit an error back to the PR
                    if (code) {
                        d("Handling fail from subprocess");
                        process.exitCode = code;
                        failResults = reporting_1.resultsWithFailure(processDisplayName + "` failed.", "### Log\n\n" + reporting_1.markdownCode(allLogs));
                        if (results) {
                            results = reporting_1.mergeResults(results, failResults);
                        }
                        else {
                            results = failResults;
                        }
                    }
                    return [4 /*yield*/, jsonToDSL_1.jsonToDSL(dslJSON, config.source)];
                case 1:
                    danger = _a.sent();
                    return [4 /*yield*/, exec.handleResults(results, danger.git)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
};
/** Pulls out a URL that's from the STDOUT */
var getJSONURLFromSTDOUT = function (stdout) {
    var match = stdout.match(/danger-results:\/\/*.+json/);
    if (!match) {
        return undefined;
    }
    return match[0];
};
/** Pulls the JSON directly out, this has proven to be less reliable  */
var getJSONFromSTDOUT = function (stdout) {
    var lines = stdout.split("\n");
    return lines.find(function (line) {
        var trimmed = line.trim();
        return (trimmed.startsWith("{") &&
            trimmed.endsWith("}") &&
            trimmed.includes("markdowns") &&
            trimmed.includes("fails") &&
            trimmed.includes("warnings"));
    });
};
exports.default = exports.runDangerSubprocess;
//# sourceMappingURL=runDangerSubprocess.js.map