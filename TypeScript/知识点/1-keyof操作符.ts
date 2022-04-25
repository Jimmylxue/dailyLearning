{
	type Person = {
		name: string
		age: number
	}

	type PersonKey = keyof Person // type PersonKey = 'name'|'age'

	const p1: PersonKey = 'name'
	const p2: PersonKey = 'age'
	// const p3: PersonKey = 'other' // 编译报错

	/**
	 * keyof 可以获取 一个类型的 所有的 “键（key）” 组成一个 类似元组类型
	 */

	let user: Person = {
		name: 'jimmy',
		age: 22,
	}

	function getValue(p: Person, k: keyof Person) {
		return p[k]
	}

	getValue(user, 'name')
	// getValue(user, 'love') 编译不通过
	/**
	 * 这个例子中  TS 会做属性检测， 当我们试图传一个 不存在的属性时，编译器会直接报错
	 *  这个就是 TS 妙用的一点
	 */
}
