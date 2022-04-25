let checkObj = function () {}

checkObj.prototype = {
	checkName() {
		console.log('checkname!!!')
		return this
	},
	checkEmail() {
		console.log('checkEmail!!!')
		return this
	},
	checkPassWord() {
		console.log('checkPassWord!!')
		return this
	},
}

let a = new checkObj()
a.checkName().checkEmail().checkPassWord()

/**
 * 通过函数内返回 this 自身 实现了链式调用 成功简化了代码
 *  但是我们可以更加骚的实现这个逻辑
 */
