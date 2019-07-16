"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChainItem = /** @class */ (function () {
    function ChainItem() {
        this.match = function () { return false; };
        this.action = function () { return undefined; };
        this.next = undefined;
        this.payload = undefined;
    }
    return ChainItem;
}());
exports.ChainItem = ChainItem;
var ChainEngine = /** @class */ (function () {
    function ChainEngine(ruleList, s) {
        this.s = s;
        this.ruleList = ruleList;
    }
    ChainEngine.prototype.Action = function (ctx) {
        for (var i = 0; i < this.ruleList.length; i++) {
            if (this.ruleList[i].match(ctx)) {
                this.ruleList[i].action(ctx);
                this.s = i;
                if (this.ruleList[i].next === undefined) {
                    return this;
                }
                return this.ruleList[i].next;
            }
        }
        return this;
    };
    ChainEngine.prototype.State = function () {
        return this.s < 0 || this.s >= this.ruleList.length ? undefined : this.ruleList[this.s].payload;
    };
    return ChainEngine;
}());
function newChain(ruleList, init) {
    return new ChainEngine(ruleList, init);
}
exports.default = newChain;
