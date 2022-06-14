/**
 * 如果按照这个方式实现下去，那么整体的代码和 base 的代码相比是更加优雅的
 * 用户也会更加喜欢这个方法，因为它提供了一个用户自定义处理错误的方式
 *
 * vue3源码中 错误处理就是这个方向处理的
 */

let errorFn = null // 用户存放用户自定义错误处理的方法

function foo(fn) {
	// to do somethings
	catchError(fn)
}

function bar(fn) {
	// to do somethings
	catchError(fn)
}

// 内部统一做错误处理
function catchError(fn) {
	try {
		fn & fn()
	} catch (error) {
		errorFn && errorFn()
	}
}

// 暴露给用户的 如果发生错误了 应该要如何处理的接口
function ErrorHandler(fn) {
	errorFn = fn
}

module.exports = {
	foo,
	bar,
	ErrorHandler,
}
