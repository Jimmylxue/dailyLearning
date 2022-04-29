{
	/**
	 * ReturnType 直译 返回值类型 也就是函数返回值类型
	 *  传递一个 泛型 获取这个泛型的返回值类型
	 */

	type fn = (x: number, y: number) => number
	type fnType = ReturnType<fn> // number类型 因为 fn类型的返回值就是 number类型

	/**
	 * 实现一个 ReturnType
	 *  <T extends (...args: any) => any> 约束了 T 是一个函数类型
   *  
   *  T 继承一个函数类型的 返回值
   *  T extends (
        ...args: any
      ) => infer R  // 使用 infer 推断  是否是一个函数 且 是否有返回 R 类型 如果有 则为 R类型 否则为 any 类型
        ? R
        : any
	 */
	type OtherReturnType<T extends (...args: any) => any> = T extends (
		...args: any
	) => infer R
		? R
		: any

	type fnType2 = OtherReturnType<{ name: string }> // 会报错 因为 泛型T 限制了继承自一个 函数类型
	type fnType3 = OtherReturnType<fn> // number类型
}
