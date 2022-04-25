/**
 * 在这个线程里面可以做点耗时的工作：
 *  - 解析文本（markdown转html）
 *  - 复杂的运算
 *  - 流媒体等操作
 */

onmessage = e => {
	console.log('接收到了', e)
}

setInterval(() => {
	console.log('过了一秒了')
}, 1000)

postMessage('hello world by hello world')
