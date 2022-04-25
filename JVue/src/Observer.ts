import Dep from './dep'

export default class Observer {
	constructor(data: any) {
		this.observer(data)
	}

	observer(data: any) {
		if (data && typeof data === 'object') {
			for (const key in data) {
				if (Object.prototype.hasOwnProperty.call(data, key)) {
					this.defineReactive(data, key, data[key])
				}
			}
		}
	}

	defineReactive(obj: object, key: string, value: any) {
		this.observer(value)
		let dep = new Dep()
		Object.defineProperty(obj, key, {
			get() {
				Dep.target && dep.addWatcher(Dep.target)
				return value
			},
			set: newValue => {
				if (newValue !== value) {
					console.log('>>>>>')
					this.observer(newValue)
					value = newValue
					dep.notify()
				}
			},
		})
	}
}
