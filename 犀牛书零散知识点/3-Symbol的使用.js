/**
 * Symbol 是 ES6 推出的一个 符号
 *  传递一个字符串 就算传的是相同的字符串 也是 永不重复的 字符串
 *
 *  使用符号不是为了安全，而是为了JS对象定义更加安全的扩展机制
 *  比如通过第三方的方式得到了一个对象，然后我们需要为这个对象添加一些自己的属性和方法
 *    不希望我们自己的属性与原来的属性发生属性冲突，这时候就是 Symbol 的最佳使用场景！！
 */

let str = 'Jimmy'
let a = Symbol(str)
let b = Symbol(str)

console.log('a', a)
console.log('b', b)
console.log('a===b??', a === b)
console.log('a==b??', a == b)

let obj = {
	[a]: 'HELLO',
	[b]: 'world',
	test: () => {
		console.log('this is a function')
	},
	phone: 'Iphone',
}

/**
 * Symbol 的 遍历细节
 *  我们常用的 Object.keys() 和 Object.getOwnPropertyNames() 都是只能遍历出自有属性，后者可以多返回 不可枚举的自有属性
 *    换句话说 -- 后者只要对象的属性名是字符串 都是只能遍历出自有属性，后者可以多返回
 *
 *  要想遍历出对象身上的符号 需要使用 Object.getOwnPropertySymbols()和Reflect.ownKey()
 *    Object.getOwnPropertySymbols() 只会返回对象属性名是符号的属性，无论是否可枚举
 *    Reflect.ownKeys() 返回所有的自有属性（包含不可枚举的属性也可以返回）
 */

console.log('Object.keys()', Object.keys(obj))
console.log('Object.getOwnPropertyNames()', Object.getOwnPropertyNames(obj))
console.log('Object.getOwnPropertySymbols()', Object.getOwnPropertySymbols(obj))
console.log('Reflect.ownKeys()', Reflect.ownKeys(obj))
