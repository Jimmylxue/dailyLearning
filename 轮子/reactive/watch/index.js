let activeEffect = null
const effectStack = [] // 维护一个数组，将被覆盖之前的存储进去，最后从数组中取出来，就不会被一直覆盖
const map = new Map()

function effect(fn, option = {}) {
	const effectFn = () => {
		// 每次副作用函数执行时，先将它从所有与之关联的依赖集合中删除
		cleanup(effectFn)
		activeEffect = effectFn
		effectStack.push(effectFn) // 将第一个存储起来
		const res = fn() // 存下结果
		effectStack.pop()
		activeEffect = effectStack[effectStack.length - 1] // 取出放进去的那个
		return res // 将fn的结果返回
	}
	effectFn.option = option // 将option实现挂载
	effectFn.deps = [] // 存储所有包含当前副作用函数的依赖合集
	if (!option.lazy) {
		// 只有在非 lazy 的情况下才会立即执行
		effectFn()
	}
	/**
	 * 将函数返回，就可以实现 computed 计算属性
	 */
	return effectFn
}

function cleanup(effectFn) {
	for (let i = 0; i < effectFn.deps.length; i++) {
		const deps = effectFn.deps[i] // deps 一个key对应的所有 effect副作用 是Set类型
		deps.delete(effectFn) // 在依赖集合中删掉 自身 （为了等待重新绑定关系）
	}

	effectFn.deps.length = 0 // 已经删除完了，清空即可，等待下次的 存储 =》 删除流程
}

function track(target, key) {
	if (!activeEffect) {
		return
	}
	let deps = map.get(key) // deps 是一个key对应的所有副作用
	if (!deps) {
		map.set(key, (deps = new Set()))
	}
	deps.add(activeEffect)
	/**
	 * 将所有的副作用先暂存到 activeEffect.deps
	 *  这里是引用类型，并不是深拷贝，所以如果其他地方把值删了，这里也是会同步删除的
	 */
	activeEffect.deps.push(deps) //
}

function trigger(target, key) {
	const effects = map.get(key)

	const effectToRun = new Set()
	effects &&
		effects.forEach(effectFn => {
			// 只有当 trick 和 trigger 的函数不一样时，再添加进去，一样时直接跳过，就能避免无线递归
			if (effectFn !== activeEffect) {
				effectToRun.add(effectFn)
			}
		})
	// effectToRun.forEach(effectFn => effectFn()) 这里不再直接执行了，而是判断是否有调度器，有则让调度器执行
	effectToRun.forEach(effectFn => {
		/**
		 * 调度器的关键！将执行权传递出去，交给用户自行处理
		 */
		if (effectFn.option.scheduler) {
			effectFn.option.scheduler(effectFn)
			return
		}
		// 没有调度器的时候则自己执行
		effectFn()
	})
}

function reactive(obj) {
	const proxy = new Proxy(obj, {
		get(target, key) {
			track(target, key)

			return target[key]
		},
		set(target, key, value) {
			target[key] = value
			trigger(target, key)
		},
	})
	return proxy
}

const data = reactive({
	ok: true,
	text: 'hello world',
	count: 1,
	num: 2,
})

let temp1, temp2

/**
 * 设计一个队列，屏蔽过渡状态*********
 */
const jobQueue = new Set() // Set能自然的实现去重
const p = Promise.resolve()

let isFlushing = false
function flushJob() {
	if (isFlushing) return
	isFlushing = true
	p.then(() => {
		jobQueue.forEach(job => job()) // 队列中的元素执行一遍（不会有重复的元素）
	}).finally(() => {
		isFlushing = false
	})
}

function computed(getter) {
	let value
	let dirtyFlag = true

	/**
	 * 以上两个变量配合使用 使用computed的缓存配置
	 */

	const effectFn = effect(getter, {
		lazy: true,
		scheduler() {
			// 调度器 => 只有当 触发响应式变化时才会执行
			dirtyFlag = true
			/**
			 * 因为computed 其 副作用的lazy的 所以需要手动触发 trigger 和 track
			 *
			 *  这样就能解决 effect 监听 computed的问题
			 */
			trigger(obj, value)
		},
	})

	const obj = {
		get value() {
			if (dirtyFlag) {
				value = effectFn()
				dirtyFlag = false
			}
			track(obj, value)
			return value
		},
	}
	return obj
}

function traverse(value, seen = new Set()) {
	if (typeof value !== 'object' || value === null || seen.has(value)) {
		return
	}

	seen.add(value)

	for (const k in value) {
		traverse(value[k], seen)
	}

	return value
}

function watch(source, callback) {
	let getter
	if (typeof source === 'function') {
		getter = source
	} else {
		getter = () => traverse(source)
	}

	let oldValue, newValue

	const effectFn = effect(() => getter(), {
		lazy: true,
		scheduler() {
			newValue = effectFn()
			callback(newValue, oldValue)
			oldValue = newValue
		},
	})
	oldValue = effectFn()
}

watch(
	() => data.count,
	(newValue, oldValue) => {
		console.log('newValue', newValue)
		console.log('oldValue', oldValue)
	}
)

console.log('???')

data.count++
data.count++
