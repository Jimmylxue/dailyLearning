{
	/**
	 * Required<T>
	 *  将所有的属性变为必填项
	 */

	type Person = {
		name?: string
		age?: number
		sex?: boolean
	}

	type RequirePerson = Required<Person>

	const jimmy: RequirePerson = {
		name: 'jimmy',
		age: 22,
		sex: true,
	}

	/**
	 * Required 和 Partial 是互斥的 简单实现一下
	 */
	type RequireType<T> = {
		// [key in keyof T]: T[key] 直接赋值 原来可选的还是继续可选
		[key in keyof T]-?: T[key] // 这里细节是 需要使用 -? 可以理解成 将原来的 ? 给 "减" 掉
	}

	type OtherRequire = RequireType<Person>

	/**
	 * 复习一个 Partial
	 */

	type OtherPartial<T> = {
		[key in keyof T]?: T[key]
	}
	type OtherPartialType = OtherPartial<OtherRequire>
}
