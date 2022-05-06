import { to } from './await-to-js.js'

const Message = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// resolve({
			// 	name: 'jimmy',
			// 	age: 22,
			// })
			reject({
				status: 401,
				message: '请先登录',
			})
		}, 3000)
	})
}

const getInfo = async () => {
	const [err, res] = await to(Message(), { data: '错误了' })
	console.log('res', res)
	console.log('err', err)
}

const getInfo2 = async () => {
	try {
		let res = await Message()
		console.log('成功了', res)
	} catch (error) {
		console.log(error, 'sssss')
	}
}

getInfo()
getInfo2()
