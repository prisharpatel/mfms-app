"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var validateDangerfileExists = function (filePath) {
    var stat = null;
    try {
        stat = fs.statSync(filePath);
    }
    catch (error) {
        console.error("Could not find a dangerfile at " + filePath + ", not running against your PR.");
        process.exitCode = 1;
    }
    if (!!stat && !stat.isFile()) {
        console.error("The resource at " + filePath + " appears to not be a file, not running against your PR.");
        process.exitCode = 1;
    }
    return !!stat && stat.isFile();
};
exports.default = validateDangerfileExists;
//# sourceMappingURL=validateDangerfileExists.js.map