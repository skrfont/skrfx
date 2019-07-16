import { Engine } from '..'

export class State {
    actions: Object
    payload: any
    constructor() {
        this.actions = new Map
        this.payload = undefined
    }
}

class StateEngine implements Engine {
    private s: string
    private ruleMap: any
    constructor(ruleMap: Object, s: string) {
        this.s = s
        this.ruleMap = ruleMap
    }
    Action(e: string): Engine {
        const o = this.ruleMap[this.s]
        if (o === undefined) {
            return this
        }
        const next = o.actions[e]
        if (typeof next === 'string') {
            this.s = next
            return this
        }
        if (next instanceof Function) {
            next((s: string) => {this.s = s})
            return this
        }
        return this
    }
    State(): any {
        return {state: this.s, payload: this.ruleMap[this.s].payload}
    }
}

export default function newState(ruleMap: Object, init: string): Engine {
    return new StateEngine(ruleMap, init)
}
