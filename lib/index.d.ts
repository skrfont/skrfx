import { ChainItem } from './chain';
export interface Engine {
    Action(ctx: any): Engine;
    State(): any;
}
export default function skrfx(rules: Object | Array<ChainItem>, init: string | number): Engine;
