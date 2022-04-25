class Watcher {
  constructor(vm, reactive, callback) {
    this.vm = vm;
    this.reactive = reactive;
    this.callback = callback;

    this.oldValue = this.getValue(this.vm, this.reactive);
  }

  getValue(vm, expr) {
    Dep.target = this;
    console.log(Dep.target);
    let value = compileTool.getVal(vm, expr); // 执行这步的时候 这个观察者就被添加了 添加完了之后就可以清空
    Dep.target = null;
    return value;
  }

  update() {
    let newValue = compileTool.getVal(this.vm, this.reactive);
    if (newValue !== this.oldValue) {
      this.callback(newValue);
    }
  }
}
