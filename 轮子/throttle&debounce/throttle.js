function throttle(fn, delay) {
	let timeout = 0
	return (...args) => {
		const now = +Date.now()
		if (now > timeout + delay) {
			timeout = now
			fn.apply(this, args)
		}
	}
}
