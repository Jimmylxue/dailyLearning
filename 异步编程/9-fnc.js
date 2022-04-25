// let fnc = {}
function timeout(delay) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, delay)
	})
}

function interval(delay, callback) {
	return new Promise((resolve, reject) => {
		let id = setInterval(() => {
			callback(id, resolve)
		}, delay)
	})
}

interval(1000, (id, resolve) => {
	console.log('hello wolrd')
	clearInterval(id)
	resolve('封装成功')
}).then(res => {
	console.log('promise', res)
})

// timeout(2000)
// 	.then(() => {
// 		console.log('使用Promise')
// 		return timeout(2000)
// 	})
// 	.then(() => {
// 		console.log('封装的定时器')
// 	})

// setTimeout(() => {
// 	console.log('不封装')
// 	setTimeout(() => {
// 		console.log('回调地狱')
// 	}, 2000)
// }, 2000)
