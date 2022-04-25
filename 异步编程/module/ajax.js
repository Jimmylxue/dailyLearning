class HttpError extends Error {
	constructor(msg) {
		super(msg) // 这里的msg 会被默认放在 message 属性里面
		this.name = '接口错误'
	}
}

class ParamsError extends Error {
	constructor(msg) {
		super(msg)
		this.name = '参数错误'
	}
}

function ajax(url) {
	return new Promise((resolve, reject) => {
		if (!/^https?/.test(url)) {
			reject(new ParamsError('请求地址错误'))
		}
		let xml = new XMLHttpRequest()
		xml.open('GET', url)
		xml.send()
		xml.onload = () => {
			console.log('kkk', xml)
			// 箭头函数this指向的是 调用这个函数对象的this
			if (xml.status == 200) {
				resolve(xml.response)
			} else if (xml.status == 404) {
				reject(new HttpError('请输入正确的接口'))
			} else {
				reject('加载失败')
			}
		}
	})
}
