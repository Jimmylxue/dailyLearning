Function.prototype.addMethod = function (name, fn) {
	this.prototype[name] = fn
	return this
}

let Method = new Function()
Method.addMethod('checkName', function () {
	console.log('checkName!!!!')
	return this
})
	.addMethod('checkEmail', function () {
		console.log('checkEmail!!!')
		return this
	})
	.addMethod('checkPassWord', function () {
		console.log('checkPassWord@@@@')
		return this
	})

let m = new Method()
m.checkName().checkEmail().checkPassWord()
/**
 * 这是一个十分骚的实现方式，封装再封装，就是这样 可以很好的表达这个章节的内容，就是 js 是一门 灵活的语言
 */
