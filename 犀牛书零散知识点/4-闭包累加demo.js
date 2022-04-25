function functinAdd() {
	var count = null
	return () => {
		// 这就是一个闭包！！
		if (!count) {
			count = 1
		} else {
			count++
		}
		return count
	}
}

const demo = functinAdd()

console.log(demo())
console.log(demo())
console.log(demo())
console.log(demo())

/**
 * 解析
 * 	这里执行demo() 实际上执行的是 functionAdd()函数返回的那个箭头函数
 * 		箭头函数可以访问这个count变量，原因是函数使用的是词法作用域，函数被定义的时候它的作用域
 * 		就能够成功的访问的count  所以这个函数无论是在哪里执行 都能够访问这个count
 * 	这个就是闭包的特性！！
 */
