{
	type Person = {
		name: string
		age: number
	}

	let user: Person = {
		name: 'jimmy',
		age: 22,
		// sex:boolean
	}

	function getValue(p: Person, k: keyof Person) {
		return p[k]
	}

	getValue(user, 'name')
}
