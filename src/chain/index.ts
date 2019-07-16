import { Engine } from '..'

export class ChainItem {
    match: (ctx: any) => boolean
    action: (ctx: any) => void
    next: Engine | undefined
    payload: any
    constructor() {
        this.match = () => false
        this.action = () => undefined
        this.next = undefined
        this.payload = undefined
    }
}

class ChainEngine implements Engine {
    private s: number
    private ruleList: Array<ChainItem>
    constructor(ruleList: Array<ChainItem>, s: number) {
        this.s = s
        this.ruleList = ruleList
    }
    Action(ctx: any): Engine {
        for (let i = 0; i < this.ruleList.length; i++) {
            if (this.ruleList[i].match(ctx)) {
                this.ruleList[i].action(ctx)
                this.s = i
                if (this.ruleList[i].next === undefined) {
                    return this
                }
                return <ChainEngine>this.ruleList[i].next
            }
        }
        return this
    }
    State(): any {
        return this.s < 0 || this.s >= this.ruleList.length ? undefined : this.ruleList[this.s].payload
    }
}

export default function newChain(ruleList: Array<ChainItem>, init: number): Engine {
    return new ChainEngine(ruleList, init)
}
