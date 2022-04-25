class Observer {
  constructor(data) {
    // console.log("ijndijs", data);
    this.observer(data);
  }

  observer(data) {
    // console.log("xsdasdasxxxx");
    if (data && typeof data === "object") {
      // console.log("xsdasdasxxxx");
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          // const element = object[key];
          console.log("xxxxx");
          this.defineReactive(data, key, data[key]);
        }
      }
    }
  }

  defineReactive(obj, key, value) {
    // 深度递归调用
    this.observer(value);
    let that = this;
    let dep = new Dep();
    console.log("hello worldssss");
    Object.defineProperty(obj, key, {
      get() {
        console.log("33333333333");
        Dep.target && dep.addWather(Dep.target);
        console.log(Dep.target);
        return value;
      },
      set: (newValue) => {
        if (newValue != value) {
          this.observer(newValue); // 新赋值的对象也重新绑定一次
          value = newValue;
          console.log(newValue, "xxx");
          dep.notify(); // 发布新值
        }
      },
    });
  }
}
