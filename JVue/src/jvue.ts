import Compile from './compile';

import Observer from './Observer';
import { baseConfig } from './baseInterface';
// console.log('hello')
export default class Jvue {
  $el = null;
  $data = null;
  $method = null;
  constructor(config: baseConfig) {
    console.log('hello world')
    this.$el = config.el;
    this.$data = config.data;
    this.$method = config.method;

    new Observer(this.$data);
    this.proxyMVVM(this.$data);
    new Compile(this.$el, config,this);
    console.log(this,'xxxx')
  }

  proxyMVVM(obj: object): void {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        Object.defineProperty(this, key, {
          get() {
            return obj[key];
          },
          set(newValue) {
            console.log('??')
            obj[key] = newValue;
          },
        });
      }
    }
  }
}
