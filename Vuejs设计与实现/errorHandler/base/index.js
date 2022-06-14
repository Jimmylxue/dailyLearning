const { foo, bar } = require('./utils')

foo(() => {
	console.log('foo function')
})

bar('hello world')
