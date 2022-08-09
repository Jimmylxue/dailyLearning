let temp = null
const map = new Map()

function effect(fn) {
	temp = fn
	return fn()
}

function reactive(obj) {
	const proxy = new Proxy(obj, {
		get(target, key) {
			const deps = map.has(key)
			if (deps) {
				map.get(key).add(temp)
			} else {
				map.set(key, new Set([temp]))
			}
			return target[key]
		},
		set(target, key, value) {
			target[key] = value
			map.get(key).forEach(fn => {
				fn?.()
			})
		},
	})
	return proxy
}

const data = reactive({
	ok: true,
	text: 'hello world',
})

effect(() => {
	console.log('comming')
	document.body.innerText = data.ok ? data.text : 'not change'
})

console.log('sss', data, map)
// data.text = 'shjhddjh'
data.ok = false
data.text = 'ccddeess'
data.text = 'sss'
// data.text = 'ccddee'
