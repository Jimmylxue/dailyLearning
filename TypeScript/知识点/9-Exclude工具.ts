{
	/**
	 *  Exclude<T, U>
	 *    去除 T 类型 与 U 类型的交集返回
	 */

	/**
	 * 细节：只有在非联合类型下 才会有我们预期的筛选效果 而联合类型下是不行的
	 */
	type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
	const text1: T1 = 'c'

	type T2 = Exclude<string | number | (() => void), Function>
	const text2: T2 = 'ddd'
	const text3: T2 = 333

	/**
	 * 测试联合模式下：
	 */
	type Person = {
		name: string
		age: number
		height: number
		weight: number
		sex: boolean
		lover: string
	}

	type Coder = {
		dz: string
	}

	type NotSame = Exclude<Person, Coder> // Person 类型
	/**
	 * 联合类型 和 联合类型进行判断是否是子集 永远都是true
	 */

	/**
	 * 实现一下：
	 */
	type Exclude<T, U> = T extends U ? never : T
}
