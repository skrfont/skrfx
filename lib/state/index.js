"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    function State() {
        this.actions = new Map;
        this.payload = undefined;
    }
    return State;
}());
exports.State = State;
var StateEngine = /** @class */ (function () {
    function StateEngine(ruleMap, s) {
        this.s = s;
        this.ruleMap = ruleMap;
    }
    StateEngine.prototype.Action = function (e) {
        var _this = this;
        var o = this.ruleMap[this.s];
        if (o === undefined) {
            return this;
        }
        var next = o.actions[e];
        if (typeof next === 'string') {
            this.s = next;
            return this;
        }
        if (next instanceof Function) {
            next(function (s) { _this.s = s; });
            return this;
        }
        return this;
    };
    StateEngine.prototype.State = function () {
        return { state: this.s, payload: this.ruleMap[this.s].payload };
    };
    return StateEngine;
}());
function newState(ruleMap, init) {
    return new StateEngine(ruleMap, init);
}
exports.default = newState;
