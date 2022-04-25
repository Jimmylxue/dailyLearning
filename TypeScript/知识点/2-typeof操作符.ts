{
	/**
	 * typeof 在 js 中就是一个非常有用的一个操作符
	 *  可以返回 一个目标值的对象
	 *
	 * 在 TS 可以利于这个机制 给某个 目标对象赋值一个类型
	 */

	type Person = {
		name: string
		age: number
	}

	const jimmy: Person = {
		name: 'Jimmy',
		age: 22,
	}

	// OtherPerson 的类型是 jimmy这个对象的类型 OtherPerson = Person
	type OtherPerson = typeof jimmy

	const fn = (a: number, b: number): number => a + b
	const f2: typeof fn = (c: number, d: number) => c - d
	/**
	 * f2 的类型 为 fn 的类型
	 *  所以 f2 也必须接受两个参数 且返回值是一个 number类型的数
	 *
	 * 这个在看公司同事前辈代码有看到有这样写的  也是非常的好用
	 */
}
