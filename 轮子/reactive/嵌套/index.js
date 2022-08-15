let activeEffect = null
const map = new Map()

function effect(fn) {
	const effectFn = () => {
		// 每次副作用函数执行时，先将它从所有与之关联的依赖集合中删除
		cleanup(effectFn)
		activeEffect = effectFn
		fn()
	}
	effectFn.deps = [] // 存储所有包含当前副作用函数的依赖合集
	effectFn()
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
	console.log(activeEffect)
	/**
	 * 将所有的副作用先暂存到 activeEffect.deps
	 *  这里是引用类型，并不是深拷贝，所以如果其他地方把值删了，这里也是会同步删除的
	 */
	activeEffect.deps.push(deps) //
}

function trigger(target, key) {
	const effects = map.get(key)
	const effectToRun = new Set(effects)
	effectToRun.forEach(effectFn => effectFn())
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
})

let temp1, temp2

effect(() => {
	console.log('effect1执行')
	effect(() => {
		console.log('effect2执行')
		temp2 = data.text
	})
	temp1 = data.ok
})

/**
 * 按照我们的思路： 当data.ok变化，按道理应该有如下输出顺序
 * 	effect1执行（初次）
 * 	effect2执行（初次）
 * 	effect1执行
 * 	effect2执行
 *
 * 因为data.ok变化了 会导致 effect1 重新执行  effect1重新执行了就会导致 effect2 重新执行
 */

data.ok = false

/**
 * 但是 实际结果为：
 * 	effect1执行（初次）
 * 	effect2执行（初次）
 * 	effect2执行
 *
 * 	少了一次 effect1执行，这是为什么呢？
 *
 * 	解析：
 * 		因为我们全局就维护了一个 activeEffect ，当发生嵌套时，嵌套内部的 effect对应的 fn 就会将我们外部原本维护的
 * 		那个唯一的 activeEffect 给覆盖，这就是罪魁祸首，所以最重要的就是，我们要保证我们的 activeEffect 不被覆盖
 *
 * 	详细解决方案：见 stack.js
 */
