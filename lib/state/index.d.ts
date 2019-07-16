import { Engine } from '..';
export declare class State {
    actions: Object;
    payload: any;
    constructor();
}
export default function newState(ruleMap: Object, init: string): Engine;
