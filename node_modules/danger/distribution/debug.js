"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
exports.debug = function (value) {
    var d = debug_1.default("danger:" + value);
    // In Peril, when running inside Hyper, we don't get access to stderr
    // so bind debug to use stdout
    if (process.env.x_hyper_content_sha256) {
        d.log = console.log.bind(console);
    }
    return d;
};
//# sourceMappingURL=debug.js.map