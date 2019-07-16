import { Engine } from '..';
export declare class ChainItem {
    match: (ctx: any) => boolean;
    action: (ctx: any) => void;
    next: Engine | undefined;
    payload: any;
    constructor();
}
export default function newChain(ruleList: Array<ChainItem>, init: number): Engine;
