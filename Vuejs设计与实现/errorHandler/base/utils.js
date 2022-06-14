/**
 * try-catch 是用户自己写吗？ 如果是用户自己在开发零碎的东西，那是没问题的
 * 	但是如果是我们在设计框架，或者说写一些公用的工具方法。
 * 	就算是为了开发体验，也应该在内部继承实现
 */

/**
 * 	过去我曾大量的写过这样的代码。
 * 	当只有一两个try-catch的时候其实还好，但是一旦 方法多了，就会发现try-catch会让代码变得不太好看，而且也不利于统一的管理
 *
 * 	这种其实是能优化的， 优化代码写在 pro 文件夹下
 */

function foo(fn) {
	try {
		fn && fn()
	} catch (error) {
		console.warn('not a function')
	}
}

function bar(fn) {
	try {
		fn && fn()
	} catch (error) {
		console.warn('not a function')
	}
}

module.exports = {
	foo,
	bar,
}
