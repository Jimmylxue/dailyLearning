{
	/**
	 * 将 泛型 的属性 全部变为可选属性
	 */

	type Person = {
		name: string
		age: number
	}

	type Other = Partial<Person>

	/**
	 * user 是 Other 类型  Other 是经过 Partial 处理过的 Perosn
	 *  所以 Other是 Person 类型 所有属性都转为可选之后的类型
	 */
	let user: Other = {
		name: '111',
	}

	/**
	 * 手动实现一个 Partial
	 */

	type OtherPartial<T> = {
		/**
		 * in 只能用在类型的定义中，可以对枚举类型进行遍历
		 */
		[key in keyof T]?: T[key]
	}

	type Other2 = OtherPartial<Person>

	let user2: Other2 = {
		age: 22,
	}

	/**
	 * 由此可见 Partial 就相当于是 TS 为我们封装了一些 常用 & 好用 的静态方法
	 */
}
