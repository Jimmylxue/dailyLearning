class Dep {
  constructor() {
    this.watchers = [];
  }

  // 订阅
  addWather(watcher) {
    this.watchers.push(watcher);
  }

  // 发布
  notify() {
    this.watchers.forEach((watcher) => watcher.update());
  }
}
