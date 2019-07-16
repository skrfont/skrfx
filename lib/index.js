"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = __importDefault(require("./chain"));
var state_1 = __importDefault(require("./state"));
function skrfx(rules, init) {
    if (rules instanceof Array) {
        return chain_1.default(rules, init);
    }
    if (rules instanceof Object) {
        return state_1.default(rules, init);
    }
    throw "skrfx need map or array as param";
}
exports.default = skrfx;
