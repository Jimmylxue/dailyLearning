let checkObj = function () {}

checkObj.prototype.checkName = function () {
	console.log('name')
}

checkObj.prototype.checkEmail = function () {}

checkObj.prototype.checkPassWord = function () {}

let a = new checkObj()
a.checkName()

/**
 * 我们 巧妙地 使用 prototype 原型的的方式 使用方法的复用，但是这里其实写法上还能简单的优化一些，就是这里我们写了
 *  三次 checkObj.prototype 万一有十个方法 其实这个写法就有点多余和恶心了
 */
