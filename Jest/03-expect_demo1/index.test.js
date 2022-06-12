// toBe 是一个深比较（引用比较）
test('toBe 匹配器', () => {
	const user = {
		name: 'jimmy',
	}
	expect(user.name).toBe('jimmy')
})

// 这个是通过不了的，意味着 toBe 其实是深比较，会比较内存中的引用地址，如果只想浅比较 可以使用 toEqual
// test('toBe 匹配器', () => {
// 	const user = {
// 		name: 'jimmy',
// 	}
// 	expect(user).toBe({ name: 'jimmy' })
// })

// 浅比较
test('toEqual', () => {
	const user = {
		name: 'jimmy',
	}
	expect(user).toEqual({ name: 'jimmy' })
})

// 判断是否为null
test('toBeNull 匹配器', () => {
	const a = null
	expect(a).toBeNull()
})

// 判断是否是 undefined
test('toBeUndefined 匹配器', () => {
	const a = void 0
	expect(a).toBeUndefined()
})

// 判断是否是 有定义的值 和 undefined是相反的
test('toBeDefined 匹配器', () => {
	const a = 1
	expect(a).toBeDefined()
})

// 判断是否是 真值
test('toBeTruthy 匹配器', () => {
	const a = 1
	expect(a).toBeTruthy()
})

// 判断是否是假值
test('toBeFalsy 匹配器', () => {
	const a = 0
	expect(a).toBeFalsy()
})
