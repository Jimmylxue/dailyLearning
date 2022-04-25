const compileTool = {
  // 根据表达式取出对应的数据
  getVal(vm, expr) {
    // 数据有可能是  student.name  student.age
    return expr.split(".").reduce((data, current) => {
      return data[current];
    }, vm.data);
  },
  getContentValue(vm, expr) {
    // 遍历表达式  将内容重新替换成完整的内容返回
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    });
  },

  // getVal() {},

  text(node, expr, vm) {
    let fn = updater.textUpdate;
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      let reactive = args[1];
      new Watcher(vm, reactive, () => {
        fn(node, this.getContentValue(vm, expr));
      });

      return this.getVal(vm, reactive);
    });
    fn(node, content);
  },
};

const updater = {
  textUpdate(node, text) {
    node.textContent = text;
  },
};
