let temp = null
const map = new Map()

function effect(fn) {
	temp = fn
	return fn()
}

function reactive(obj) {
	const proxy = new Proxy(obj, {
		get(target, key) {
			if (map.has(key)) {
				map.get(key).add(temp)
			} else {
				map.set(key, new Set())
			}
			temp = null
			return target[key]
		},
		set(target, key, value) {
			target[key] = value
			map.get(key).forEach(fn => fn())
		},
	})
	return proxy
}

const data = reactive({
	name: 'jimmy',
	age: 22,
})

let a = null
let b = null

effect(() => (a = data.name))
effect(() => (b = data.age + 10))

data.name = 'xuexue'
data.age = 18
console.log(a, 'reactive a')
console.log(b, 'reactive b')
