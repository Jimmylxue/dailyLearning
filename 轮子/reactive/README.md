# 实现 reactive 响应式数据

学习 vue 的 reactive 的实现，使用`Proxy API`来实现一个数据响应式的数据。目标效果如下：

```js
const a = {
  website:'http://www.baidu.com',
  age:22
}

const b = a.website

a.website = 'http://www.jimmyxuexue.top'

console.log(a.website) // http://www.jimmyxuexue.top
console.log(b) // http://www.baidu.com

/*
	最终目标： b 也是 http://www.jimmyxuexue.top 二者值一直保持同步
*/
```

总结下来实现的步骤其实就是两步：

1. 收集依赖关系（副作用收集）

   使用`effect`函数来接受一个个的副作用函数

2. 当数据变化时执行副作用函数

## 依赖收集

使用`ProxyAPI`我们可以非常轻松的实现依赖收集，因为对真正的对象做了一层代理，所以当我们访问对象的某个属性时，我们都是能够捕获到这个动作的，进而就可以知道有哪些值是需要处理的副作用。

这个过程最重要的事情就是将数据和对应依赖的关系维护好。

关系大致长这样：

```js
// 以下一段伪代码吧~ 大致能表达意思
const map = {
	name:[()=>b=a.name+1,()=>c=name+'哈哈']	,
  age:[()=>d=a.age+10,()=>e=a.age-5]
}
```

## 触发更新

由于`ProxyAPI`我们也可以很轻松的捕获到对象的值是否发生了改变，当改变时，我们就去触发对应的关系。

当name值发生改变时，我们就会去name依赖关系中找出name对应的依赖数组，依次执行即可，

```js
map['name'].forEach(fn=>fn())
```

## 其他

这里依赖数组我们可以使用`Set`，依赖关系可以使用`Map`，来实现，二者都是比基础的`array`和`object`有着更高的性能，也能将我们所学的知识都融合串起来。有看过`Vue3`源码的小伙伴就会知道，`Vue3`这块用了性能更优的API，就是`WeakSet`和`WeakMap`，小伙伴们也可以用起来，这里我就使用`Map`和`Set`了。

## 完整代码

```js
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
```

