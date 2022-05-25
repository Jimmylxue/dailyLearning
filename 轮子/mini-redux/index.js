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
			effective && effective()
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
		console.log('doAction')
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
