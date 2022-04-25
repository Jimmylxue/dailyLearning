let p1 = new Promise((resolve, rejetc) => {
	// resolve('处理成功')
	rejetc('处理失败')
})

p1.then(res => {
	return new Promise((resolve, reject) => {
		reject('error')
	})
}).catch(err => {
	console.log('catch总接收', err)
})

let p2 = new Promise((resolve, reject) => {
	jimmy()
	// try {
	// 	jimmy()
	// } catch (error) {
	// 	reject(error)
	// }
})

p2.then(
	res => {
		console.log(res)
	},
	err => {
		console.log(err.message)
	}
)
