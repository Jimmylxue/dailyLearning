let checkObj = function () {}

checkObj.prototype = {
	checkName() {
		console.log('checkname!!!')
	},
	checkEmail() {
		console.log('checkEmail!!!')
	},
	checkPassWord() {
		console.log('checkPassWord!!')
	},
}

let a = new checkObj()
a.checkName()
a.checkEmail()
a.checkPassWord()

/**
 * 我们已经实现了代码上的简洁！  成功的在 prototype上添加了多个方法 且没有写多遍的 .prototype
 *  但是需要知道 7.js 和 6.js 虽然效果一样 但是对于原型链的处理差距是非常之大的 这个问题也是js面试的高频考点
 *
 * 目前的缺陷在于：我们执行三个校验 连续写了 三次 a.xxx
 *  一般情况下这种校验是一次性三个校验的  所以代码还能改进！！
 */
