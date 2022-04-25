import Watcher from './watcher'

export default class Dep {
	static target
	/**
	 * 这里使用性能更高的 set 数据结构存储
	 *   不会因为集合的长度太长的时候就影响获取的速度
	 */
	watcher: Set<any>
	constructor() {
		this.watcher = new Set()
	}

	//   订阅
	addWatcher(watcher: any): void {
		this.watcher.add(watcher)
		console.log(this.watcher, 'list')
	}

	//  发布
	notify(): void {
		this.watcher.forEach((watcher: Watcher) => {
			watcher.update()
		})
	}
}
