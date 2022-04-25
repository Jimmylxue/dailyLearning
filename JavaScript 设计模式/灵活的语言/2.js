let checkObj = {
	checkName() {
		console.log('验证名字')
	},
	checkEmail() {
		console.log('验证邮箱')
	},
	checkPassWord() {
		console.log('验证密码')
	},
}

/**
 * 比第一份代码会好一点儿了，但是还是有缺陷，如果同事有写过 checkObj对象
 *  那么也一样会覆盖掉一整个对象  好处是我们已经没有创建出三个全局变量了
 */
