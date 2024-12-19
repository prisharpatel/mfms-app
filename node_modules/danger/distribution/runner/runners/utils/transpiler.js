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
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var json5_1 = __importDefault(require("json5"));
var debug_1 = require("../../../debug");
var BabelPackagePrefix;
(function (BabelPackagePrefix) {
    BabelPackagePrefix["V7"] = "@babel/";
    BabelPackagePrefix["BEFORE_V7"] = "babel-";
})(BabelPackagePrefix || (BabelPackagePrefix = {}));
var disableTranspilation = process.env.DANGER_DISABLE_TRANSPILATION === "true";
var hasNativeTypeScript = false;
var hasBabel = false;
var hasBabelTypeScript = false;
var hasFlow = false;
var hasChecked = false;
// By default assume Babel 7 is used
var babelPackagePrefix = "@babel/" /* V7 */;
var d = debug_1.debug("transpiler:setup");
// Yes, lots of linter disables, but I want to support TS/Babel/Neither correctly
exports.checkForNodeModules = function () {
    if (disableTranspilation) {
        hasChecked = true;
        d("DANGER_DISABLE_TRANSPILATION environment variable has been set to true, skipping transpilation");
        return;
    }
    try {
        require.resolve("typescript"); // tslint:disable-line
        hasNativeTypeScript = true;
    }
    catch (e) {
        d("Does not have TypeScript set up");
    }
    var checkForBabel = function (prefix) {
        require.resolve(prefix + "core"); // tslint:disable-line
        babelPackagePrefix = prefix;
        hasBabel = true;
    };
    try {
        // Check for Babel 7
        checkForBabel("@babel/" /* V7 */);
    }
    catch (e) {
        try {
            // Check for older Babel versions
            checkForBabel("babel-" /* BEFORE_V7 */);
        }
        catch (e) {
            d("Does not have Babel set up");
        }
    }
    if (hasBabel) {
        // @babel/polyfill is a direct dependency of Danger.
        require("@babel/polyfill"); // tslint:disable-line
        try {
            require.resolve(babelPackagePrefix + "plugin-transform-typescript"); // tslint:disable-line
            hasBabelTypeScript = true;
        }
        catch (e) {
            d("Does not have Babel 7 TypeScript set up");
        }
        try {
            require.resolve(babelPackagePrefix + "plugin-transform-flow-strip-types"); // tslint:disable-line
            hasFlow = true;
        }
        catch (e) {
            d("Does not have Flow set up");
        }
    }
    hasChecked = true;
};
// Now that we have a sense of what exists inside the users' node modules
exports.typescriptify = function (content) {
    var ts = require("typescript"); // tslint:disable-line
    // Support custom TSC options, but also fallback to defaults
    var compilerOptions;
    if (fs.existsSync("tsconfig.json")) {
        compilerOptions = json5_1.default.parse(fs.readFileSync("tsconfig.json", "utf8"));
    }
    else {
        compilerOptions = ts.getDefaultCompilerOptions();
    }
    var result = ts.transpileModule(content, sanitizeTSConfig(compilerOptions));
    return result.outputText;
};
var sanitizeTSConfig = function (config) {
    if (!config.compilerOptions) {
        return config;
    }
    var safeConfig = config;
    // It can make sense to ship TS code with modules
    // for `import`/`export` syntax, but as we're running
    // the transpiled code on vanilla node - it'll need to
    // be used with plain old commonjs
    //
    // @see https://github.com/apollographql/react-apollo/pull/1402#issuecomment-351810274
    //
    if (safeConfig.compilerOptions.module) {
        safeConfig.compilerOptions.module = "commonjs";
    }
    return safeConfig;
};
exports.babelify = function (content, filename, extraPlugins) {
    var babel = require(babelPackagePrefix + "core"); // tslint:disable-line
    // Since Babel 7, it is recommended to use `transformSync`.
    // For older versions, we fallback to `transform`.
    // @see https://babeljs.io/docs/en/babel-core#transform
    var transformSync = babel.transformSync || babel.transform;
    if (!transformSync) {
        return content;
    }
    var options = babel.loadOptions ? babel.loadOptions({ filename: filename }) : { plugins: [] };
    var fileOpts = {
        filename: filename,
        filenameRelative: filename,
        sourceMap: false,
        sourceFileName: undefined,
        sourceType: "module",
        plugins: extraPlugins.concat(options.plugins),
    };
    var result = transformSync(content, fileOpts);
    d("Result from Babel:");
    d(result);
    return result.code;
};
exports.default = (function (code, filename) {
    if (!hasChecked) {
        exports.checkForNodeModules();
    }
    var filetype = path.extname(filename);
    var isModule = filename.includes("node_modules");
    if (isModule) {
        return code;
    }
    var result = code;
    if (hasNativeTypeScript && filetype.startsWith(".ts")) {
        result = exports.typescriptify(code);
    }
    else if (hasBabel && hasBabelTypeScript && filetype.startsWith(".ts")) {
        result = exports.babelify(code, filename, [babelPackagePrefix + "plugin-transform-typescript"]);
    }
    else if (hasBabel && filetype.startsWith(".js")) {
        result = exports.babelify(code, filename, hasFlow ? [babelPackagePrefix + "plugin-transform-flow-strip-types"] : []);
    }
    return result;
});
//# sourceMappingURL=transpiler.js.map