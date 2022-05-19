// let timer = null
function debounce(fn, delay) {
	let timer
	return (...args) => {
		// 判断定时器是否存在，清除定时器
		if (timer) {
			console.log('timer', timer)
			clearTimeout(timer)
			// return
		}

		// 重新调用setTimeout
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}
