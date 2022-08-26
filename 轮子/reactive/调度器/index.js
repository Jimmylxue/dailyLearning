let activeEffect = null
const effectStack = [] // 维护一个数组，将被覆盖之前的存储进去，最后从数组中取出来，就不会被一直覆盖
const map = new Map()

function effect(fn, option = {}) {
	const effectFn = () => {
		// 每次副作用函数执行时，先将它从所有与之关联的依赖集合中删除
		cleanup(effectFn)
		activeEffect = effectFn
		effectStack.push(effectFn) // 将第一个存储起来
		fn()
		effectStack.pop()
		activeEffect = effectStack[effectStack.length - 1] // 取出放进去的那个
	}
	effectFn.option = option // 将option实现挂载
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

effect(
	() => {
		console.log(data.count)
		temp1 = data.count + 1
	},
	{
		scheduler(fn) {
			console.log('进入调度器~')
			// 不关心过渡态，使用队列处理
			jobQueue.add(fn)
			flushJob(fn)

			// 要包含过渡态，直接执行fn即可 fn()
		},
	}
)

data.count += 3
data.count += 3
/**
 * 连续执行了两次
 *  但是第二次实际上一个过度过程
 *  如果我们只关心开始和结果，那么过度过程的打印是完全多余的
 */
