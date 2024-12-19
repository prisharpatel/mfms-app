"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url = __importStar(require("url"));
var lodash_includes_1 = __importDefault(require("lodash.includes"));
function pullRequestParser(address) {
    var components = url.parse(address, false);
    if (components && components.path) {
        // shape: http://localhost:7990/projects/PROJ/repos/repo/pull-requests/1/overview
        var parts = components.path.match(/(projects\/\w+\/repos\/[\w-_.]+)\/pull-requests\/(\d+)/);
        if (parts) {
            return {
                repo: parts[1],
                pullRequestNumber: parts[2],
            };
        }
        // shape: http://github.com/proj/repo/pull/1
        if (lodash_includes_1.default(components.path, "pull")) {
            return {
                repo: components.path.split("/pull")[0].slice(1),
                pullRequestNumber: components.path.split("/pull/")[1],
            };
        }
    }
    return null;
}
exports.pullRequestParser = pullRequestParser;
//# sourceMappingURL=pullRequestParser.js.map