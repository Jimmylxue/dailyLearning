/**
 * 这例子很好理解 肯定返回的是 other_data
 *  因为fun函数访问scope的时候  根据就近原则拿到的就是getData的scope
 *    但是这个不叫闭包 这个跟作用域有关
 */
let scope = 'global_data'
function getData() {
	let scope = 'other_data'
	function fun() {
		return scope
	}
	return fun()
}

console.log(getData()) // other_data

/**
 * ------------------------------------------------------------------------------
 */

/**
 * 这个例子就很重要的， 第一反应的时候我以为结果应该是  global_data
 *  因为内部返回的是一个函数，函数真正执行的时候是在最外侧 按道理根据作用域 应该输出的是 global_data
 *
 *  这个就是闭包， 函数的作用域不是在哪里执行决定的，而是定义它的时候就决定了
 *    这个叫做词法作用域 ！  JS的函数就是按照词法作用域的
 *
 *  就是根据这个特性 JS 的闭包才能发光发亮！
 *
 * 	总结：其实所有的函数都是闭包，只不过大部分情况下执行函数的地方和定义函数同属于一个作用域，所以没有明显的感知
 * 		只有当执行函数的地方 和 定义函数的作用域不属于同一个域下 这时候闭包就产生了！
 * 		JS的词法作用域， 函数的作用域不是在哪里执行决定的，而是在哪里定义决定的
 */

let scope2 = 'global_data'
function getData2() {
	let scope = 'other_data'
	function fun2() {
		return scope
	}
	return fun2
}

console.log(getData2()()) // other_data
