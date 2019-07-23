import { forIn } from 'lodash';
import { BehaviorSubject } from 'rxjs';

export function rxBlackBox(repoCfg = {}, handle = () => { }, exportList = []) {
  return function BlackBox() {
    const ctx = {};
    forIn(repoCfg, (value, key) => {
      if (key === 'events') {
        return;
      }
      ctx[key] = new BehaviorSubject(value);
    });
    const events = repoCfg.events ? repoCfg.events : this;
    handle(events, ctx);
    const output = {};
    exportList.forEach((v) => {
      output[v] = ctx[v];
    });
    return output;
  };
}

class StateManage {
  constructor(rules, init) {
    this.state = init;
    this.rules = rules;
  }

  Action(event) {
    // 锁定状态、异步状态、异常状态
    const handerList = this.rules[this.state];
    if (!handerList) {
      return this;
    }
    const hander = handerList[event];
    if (!hander) {
      return this;
    }
    const {
      state: lockState = this.state,
      af: asyncFn = () => lockState,
      ef: errorFn = () => { },
    } = hander;
    this.state = lockState;
    asyncFn(lockState).then((s) => {
      this.state = s;
    }).catch(e => errorFn(e));
    return this;
  }
}

export function stateManage({ list, init }) {
  return new StateManage(list, init);
}

const Skrfx = {
  rxBlackBox,
  stateManage,
};

export default Skrfx;
