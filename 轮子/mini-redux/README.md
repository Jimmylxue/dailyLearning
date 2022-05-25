## 实现统一的状态管理（mini-redux）

当我们开发相对大一点的项目时，一般都会上状态管理，像`vuex`、`redux`之类的全局状态。它们都有共同的点，就是数据都是 **单向流**，下面我们实现一个简单版本的`redux`，复习一下`redux`的API（因为真的很经典，面试也很容易被问到）;

**状态管理的特点：**

- 数据存储的是公用数据，且是单向的 

  **获取状态只能通过** `getState()`

- 数据都是只读数据

  **修改数据只能通过** `dispatch()`

- 当全局状态发生改变时我们可以捕获到这个动作，做出一些操作：

  **绑定修改监听器 通过** `effect()`

**redux图示：**

![image-20220525212437315](https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220525212437315.png)

我们知道了最重要的是我们要实现三个方法：`getState()`、`dispath()`、`effect()`，除此之外还有一个`reducer()`函数。

**完整代码**

```js
/**
 * 实现一个统一的状态管理 -- 类似于 redux
 *  获取状态只能通过 getState()
 *  修改数据只能通过 dispatch()
 *  绑定修改监听器 通过 effect()
 */

/**
 *
 * @param {Function} reducer
 * @param {any} preloadState
 * @returns
 */
function createStore(reducer, preloadState) {
	let currentReducer = reducer
	let currentState = preloadState
	let effective
	return {
		dispatch(action) {
			currentState = currentReducer(currentState, action)
			// 触发通知
			effective && effective() // 有绑定监听函数再执行（用户有可能并未绑定）
		},
		getState() {
			return currentState
		},
		effect(fn) {
			effective = fn
		},
	}
}

function dzReducer(state, action) {
	if (action.type === 'add') {
		console.log('cccc')
		state.age++
		return state
	}
}

let store = createStore(dzReducer, {
	name: 'jimmy',
	age: 22,
})

store.effect(() => {
	console.log('数据发生改变了')
})

console.log(store.getState())

store.dispatch({ type: 'add' })

console.log(store.getState())
```

控制台会一次输出：

```
{ name: 'jimmy', age: 22 }
doAction
数据发生改变了
{ name: 'jimmy', age: 23 }
```

核心代码就大概只有30多行，但是涉及的知识点还是比较细节的，如果小伙伴们有一些`redux` 知识会领悟的比较快（比如为什么要使用action，action要有type）其实这些都是一个规范。

之后会再实现`vuex api` 版本的状态管理。