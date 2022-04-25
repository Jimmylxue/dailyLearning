let checkObj = function () {
	this.checkName = () => {}
	this.checkEmail = () => {}
	this.checkPassWord = () => {}
}

/**
 * 因为有相当一部分人喜欢使用 类 的 new 的方式实例化对象，所以也基于类
 *  实现了一个可复用的工具类
 *
 *  缺点在于 只要通过这个类实例化出来的对象 对象自身上就存在 这三个校验方法，完全可以将其封装在 prototype 原型上
 */
