/**
 * 模板编译
 *  目标实现和 vue 一样的插值表达式
 */

const site = {
	name: 'jimmy 知识星球',
	article: 50,
	comment: 50,
}

/**
 *
 * @param {string} string
 */
function generate(string) {
	console.log('string', string)
	let template = string.replace(/\{\{([^}]+)\}\}/g, (a, b) => {
		return eval(`${b}`)
	})
	return template
}

// console.log(document.querySelectorAll('*'))
const body = document.body
const deepCheck = element => {
	const children = [...element.children]
	console.log(children)
	if (children.length > 0) {
		children.forEach(child => {
			deepCheck(child)
		})
	} else {
		const insetExpression = generate(element.textContent)
		element.textContent = insetExpression
	}
}

deepCheck(body)

console.log(generate('{{ site.article + site.comment }}'))
