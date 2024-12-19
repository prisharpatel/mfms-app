"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parse_diff_1 = __importDefault(require("parse-diff"));
var lodash_includes_1 = __importDefault(require("lodash.includes"));
/**
 * This function is essentially a "go from a diff to some simple structured data"
 * it's the steps needed for danger process.
 */
exports.diffToGitJSONDSL = function (diff, commits) {
    var fileDiffs = parse_diff_1.default(diff);
    var addedDiffs = fileDiffs.filter(function (diff) { return diff["new"]; });
    var removedDiffs = fileDiffs.filter(function (diff) { return diff["deleted"]; });
    var modifiedDiffs = fileDiffs.filter(function (diff) { return !lodash_includes_1.default(addedDiffs, diff) && !lodash_includes_1.default(removedDiffs, diff); });
    return {
        //                                             Work around for danger/danger-js#807
        modified_files: modifiedDiffs.map(function (d) { return d.to || (d.from && d.from.split(" b/")[0]); }),
        created_files: addedDiffs.map(function (d) { return d.to; }),
        deleted_files: removedDiffs.map(function (d) { return d.from; }),
        commits: commits,
    };
};
//# sourceMappingURL=diffToGitJSONDSL.js.map