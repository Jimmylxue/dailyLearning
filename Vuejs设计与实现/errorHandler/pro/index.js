const { foo, bar, ErrorHandler } = require('./utils')

ErrorHandler(() => {
	console.warn('发生错误了，这里统一进行处理')
})

foo(() => {
	console.log('foo function')
})

bar('hello world')
