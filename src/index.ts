import newChain, { ChainItem } from './chain'
import newState, { State } from './state'

export interface Engine {
    Action(ctx: any): Engine
    State(): any
}

export default function skrfx(rules : Object | Array<ChainItem>, init: string | number): Engine {
    if (rules instanceof Array) {
        return newChain(rules, <number>init)
    }
    if (rules instanceof Object) {
        return newState(rules, <string>init)
    }
    throw "skrfx need map or array as param"
}
