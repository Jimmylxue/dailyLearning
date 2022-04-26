{
	/**
	 * infer 推断
	 *  T extends { t: infer Test } ? Test : string // T类型中是否含有 t属性 ，如果含有 则赋值为 t 属性的类型  如果没有 则为 string 类型
	 *
	 *  T类型中是否含有 t属性 ，如果含有 则赋值为 t 属性的类型  如果没有 则为 string 类型
	 *  T类型中是否含有 t属性 ，如果含有 则赋值为 t 属性的类型  如果没有 则为 string 类型
	 *
	 *  多看几遍才能明白
	 */
	type Foo<T> = T extends { t: infer Test } ? Test : string
	type One = Foo<number> // string，因为number不是一个包含t的对象类型
	type Two = Foo<{ t: boolean }> // boolean，因为泛型参数匹配上了，使用了infer对应的type
	type Three = Foo<{ a: number; t: () => void }> // () => void，泛型定义是参数的子集，同样适配
}
