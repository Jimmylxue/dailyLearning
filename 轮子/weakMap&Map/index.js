const map = new Map()
const wMap = new WeakMap()
;(() => {
	const foo = { foo: 1 }
	const bar = { bar: 2 }

	map.set(foo, 1)
	map.set(2, 1)
	wMap.set(bar, 1)
	wMap.set(3, 1)

	/**
	 * WeakMap 是弱引用， 一旦表达式执行结束，垃圾回收就会把 bar 从内存中移除，所以无法从 weakMap中取到bar
	 *  一旦被垃圾回收机制回收了，就无法获取到对应的 键和值了
	 */
})()

console.log(map, map.keys()) // 依旧有办法获取 键和值
console.log(wMap) // 已经无法获取键和值了，因为是弱引用，已经被垃圾回收机制所回收了
