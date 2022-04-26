{
	function sum<T>(arr: T[]) {
		let count = 0
		/**
		 *  运算符“+=”不能应用于类型“T”和“number”。 T 可以是任意类型  如果T 是 undefined 或者其他恶心类型  就会报错
		 *  所以TS 非常智能的帮我们想到了这一点
		 *  但是开发者是知道 这个T 大致是什么类型的，所以我们就可以使用类型约束
		 *  看 sum2
		 * */
		arr.forEach(item => (item += count))
	}

	function sum2<T extends number>(arr: T[]) {
		let count = 0
		/**
		 * 这时候ts就不会报错了， 因为 T 是继承于 number的 可以理解成是 number 的子集  所以肯定是能够正常相加的
		 */
		arr.forEach(item => (count += item))
	}

	/**
	 * U 继承自 T 的所有属性，所以如果 U 不是 T 的属性时  就会提示报错
	 */
	function pick<T, U extends keyof T>(obj: T, key: U) {
		return obj[key]
	}

	let person = {
		name: 'jimmy',
		age: 22,
	} as { name: string; age: number }

	pick(person, 'name')
	pick(person, 'age')
	// xuexue 不是 person对象的属性 所以TS 直接报错
	pick(person, 'xuexue')
}
