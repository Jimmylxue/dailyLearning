class MVVM {
  constructor(config) {
    this.$el = config.el;
    this.$data = config.data;
    this.$method = config.method;

    if (this.$el) {
      new Observer(this.$data);
      this.proxyMVVM(this.$data);
      new Compile(this.$el, config);
    }
  }

  proxyMVVM(data) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        Object.defineProperty(this, key, {
          get() {
            return data[key];
          },
          set(newValue) {
            alert(newValue);
            data[key] = newValue;
          },
        });
      }
    }
  }
}
