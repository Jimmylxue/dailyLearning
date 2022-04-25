import { baseConfig } from './baseInterface'
import { getVal } from './compileTools'
import Dep from './dep'
export default class Watcher {
	vm: baseConfig
	reactive: string
	callback: Function // 函数类型 是大写开头的！
	oldValue: string
	constructor(vm: baseConfig, reactive: string, callback: Function) {
		this.vm = vm
		this.reactive = reactive
		this.callback = callback
		this.oldValue = this.getValue(this.vm, this.reactive)
	}

	getValue(vm: baseConfig, reactive: string): string {
		Dep.target = this
		let value = getVal(vm, reactive)
		Dep.target = null
		return value
	}

	update(): void {
		let newValue = getVal(this.vm, this.reactive)
		if (newValue !== this.oldValue) {
			this.callback(newValue)
			this.oldValue = newValue
		}
	}
}
