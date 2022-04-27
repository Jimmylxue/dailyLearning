{
	/**
	 * TS 提供了一个 Reacrd 工具，让我们能够快速的将一个类型的 所有属性值 转换为 另外一个类型
	 *
	 *  注意点： key只能是 string | number | symbol
	 */

	// string 类型的key  它的值 也全部转为string
	const obj: Record<string, string> = {
		name: 'zhangsan',
		tag: '打工人',
	}

	// number 类型的key string类型的值
	const obj2: Record<number, string> = {
		22: 'zhangsan',
		33: '打工人',
	}

	// symbol 类型 的key  boolean 类型的值
	const obj3: Record<symbol, boolean> = {
		[Symbol('symbol')]: true,
		[Symbol('symbol~~')]: false,
	}

	/**
	 *  T extends keyof any 表示的是 T 继承 any类型，
	 *    继承 并非它本身是 any类型  它也有自己的类型
	 *    （之所以要继承一下 any 类型  是因为 any类型可以有 对象类型 并且其是 所有类型的父集
	 *    如果直接使用 any 类型 则在这个例子下 不能限制 key 的类型了
	 *
	 *  见 OtherRecord2
	 */
	type OtherRecord<T extends keyof any, K> = {
		[key in T]: K
	}

	const obj4: OtherRecord<symbol, boolean> = {
		[Symbol('symbol')]: true,
		[Symbol('symbol~~')]: false,
		22: 'zhangsan',
	}

	/**
	 * key直接使用 any类型  则无法限制 key 自身的类型
	 */
	type OtherRecord2<K> = {
		[key in any]: K
	}

	const obj5: OtherRecord2<boolean> = {
		[Symbol('symbol')]: true,
		[Symbol('symbol~~')]: false,
		22: false,
	}
}
