const worker = new Worker('worker.js')
// console.log(1)

worker.onmessage = e => {
	console.log('接收到了消息', e)
}

setInterval(() => {
	console.log('old console')
}, 1000)

worker.postMessage('给子线程')
setTimeout(() => {
	// 2秒后开启一个阻塞主线程的任务， webworker子线程并不会被阻塞住
	confirm('理解webworker了吗 看看控制台')
}, 2000)
