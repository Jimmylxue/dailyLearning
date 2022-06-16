const container = document.getElementById('app')

const vDom = {
	tag: 'div',
	props: {
		onClick: () => {
			alert('hello world by vnode')
		},
	},
	children: 'hello world',
}

const MyComponent = () => {
	return {
		tag: 'h2',
		props: {
			onClick: () => {
				alert('function component')
			},
		},
		children: 'function component',
	}
}

const vDom2 = {
	tag: MyComponent,
}

const MyComponent2 = {
	render() {
		return {
			tag: 'h3',
			props: {
				onClick: () => {
					alert('objectVnode')
				},
			},
			children: 'object Vnode',
		}
	},
}

const vDom3 = {
	tag: MyComponent2,
}

function renderer(vnode, container) {
	const { tag } = vnode
	if (typeof tag === 'string') {
		mountElement(vnode, container)
	} else if (typeof tag === 'function') {
		// 函数式组件
		mountFunctionComponent(vnode, container)
	} else if (typeof tag === 'object') {
		console.log('ss')
		mountObjectComponent(vnode, container)
	}
}

function mountElement(vnode, container) {
	const { tag, props, children } = vnode
	const el = document.createElement(tag)
	for (const key in props) {
		if (Object.hasOwnProperty.call(props, key)) {
			const fn = props[key]
			if (/^on/.test(key)) {
				el.addEventListener(key.substring(2).toLocaleLowerCase(), fn)
			}
		}
	}

	if (typeof children === 'string') {
		el.appendChild(document.createTextNode(children))
	} else if (Array.isArray(children)) {
		children.forEach(child => renderer(child, el))
	}

	container.appendChild(el)
}

function mountFunctionComponent(vnode, container) {
	const subtree = vnode.tag()
	renderer(subtree, container)
}

function mountObjectComponent(vnode, container) {
	const subtree = vnode.tag.render()
	renderer(subtree, container)
}

renderer(vDom, container)
renderer(vDom2, container)
renderer(vDom3, container)
