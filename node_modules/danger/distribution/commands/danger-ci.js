#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var sharedDangerfileArgs_1 = __importDefault(require("./utils/sharedDangerfileArgs"));
var runner_1 = require("./ci/runner");
commander_1.default.usage("[options]").description("Runs a Dangerfile in JavaScript or TypeScript.");
sharedDangerfileArgs_1.default(commander_1.default).parse(process.argv);
var app = commander_1.default;
runner_1.runRunner(app);
//# sourceMappingURL=danger-ci.js.map