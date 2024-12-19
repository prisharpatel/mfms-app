#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var sharedDangerfileArgs_1 = __importDefault(require("./utils/sharedDangerfileArgs"));
var runner_1 = require("./ci/runner");
var LocalGit_1 = require("../platforms/LocalGit");
var Fake_1 = require("../ci_source/providers/Fake");
commander_1.default
    .usage("[options]")
    // TODO: this option
    // .option("-s, --staging", "Just use staged changes.")
    .description("Runs danger without PR metadata, useful for git hooks.");
sharedDangerfileArgs_1.default(commander_1.default).parse(process.argv);
var app = commander_1.default;
var base = app.base || "master";
var localPlatform = new LocalGit_1.LocalGit({ base: base, staged: app.staging });
localPlatform.validateThereAreChanges().then(function (changes) {
    if (changes) {
        var fakeSource = new Fake_1.FakeCI(process.env);
        // By setting the custom env var we can be sure that the runner doesn't
        // try to find the CI danger is running on and use that.
        runner_1.runRunner(app, { source: fakeSource, platform: localPlatform, additionalEnvVars: { DANGER_LOCAL_NO_CI: "yep" } });
    }
    else {
        console.log("No git changes detected between head and master.");
    }
});
//# sourceMappingURL=danger-local.js.map