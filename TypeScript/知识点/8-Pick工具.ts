{
	/**
	 * Pick<T, K>
	 *  此工具的作用是将 T 类型中的 K 键列表提取出来，生成新的子键值对类型。
	 */

	type Person = {
		name: string
		age: number
		height: number
		weight: number
		sex: boolean
		lover: string
	}

	/**
	 *  将 Person 类型中的 name lover age 取出来单独 拼凑成一个类型返回
	 */
	type OtherPerson = Pick<Person, 'name' | 'lover' | 'age'>

	const jimmy: OtherPerson = {
		name: 'jimmy',
		lover: 'xuexue',
		age: 22,
	}

	/**
	 * 实现一个 Pick
	 *  K extends keyof T
	 *    - keyof 返回的就是 对象的属性 如： 'name'|'age' K 再继承自这个
	 *    - 所以 K 一定是 T 的属性
	 *  [P in K] 遍历 K 的一个个属性 值为 T[P]
	 */
	type OtherPick<T, K extends keyof T> = {
		[P in K]: T[P]
	}

	type Person2 = {
		name: string
		age: number
		height: number
		weight: number
		sex: boolean
		lover?: string // lover 为可选
	}

	const xue: OtherPick<Person2, 'lover' | 'sex'> = {
		sex: true,
	}
}
