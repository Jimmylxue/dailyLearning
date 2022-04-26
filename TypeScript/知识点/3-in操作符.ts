/**
 *
 */

{
	/**
	 * js 中  in 可以用于遍历对象中的 所有的key
	 * ts 中  in还能用于处理类型。遍历出一个类型中的每个key
	 *
	 * 用法：[ 自定义变量名 in 枚举类型 ]: 类型
	 */

	type Person = {
		name: string
		age: number
	}

	type KeyToNumber<T> = {
		/**
		 * keyof 能够获取 T 所有的 key
		 *  再使用 in 遍历所有的key
		 *  最终意思是  将 T 的所有的 key取出来 赋值为number类型
		 * */
		[key in keyof T]: number
	}
	// 类型赋值  Person 就是 KeyToNumber 的 T
	const jimmy: KeyToNumber<Person> = {
		name: 15120,
		age: 22,
	}
}
