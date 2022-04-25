import { baseConfig } from './baseInterface'
import {
	transferText,
	getDirectiveType,
	onDirective,
	showDirective,
} from './compileTools'
import { DirectiveType } from './directive'

class Compile {
	vm: baseConfig
	app
	rootDOM: HTMLElement
	constructor(el: any, vm: baseConfig, app: any) {
		this.vm = vm
		this.app = app
		this.rootDOM = this.isElementNode(el) ? el : document.getElementById(el)

		let fragment: DocumentFragment = this.getFragment(this.rootDOM)

		this.compile(fragment)

		this.rootDOM.appendChild(fragment)
	}

	isElementNode(el: any): boolean {
		return el.nodeType === 1
	}

	getFragment(node: HTMLElement): DocumentFragment {
		let fragment = document.createDocumentFragment()
		while (node.firstChild) {
			fragment.appendChild(node.firstChild)
		}
		return fragment
	}

	compile(fragment): void {
		let childNode = fragment.childNodes
		;[...childNode].map(node => {
			if (this.isElementNode(node)) {
				this.compileElement(node)
				this.compile(node) // 递归编译
			} else {
				// 文本内容
				this.compileText(node)
			}
		})
	}

	/**
	 * 编译节点元素  主要是处理类似于 v-if  @click 之类的一些特殊的指令
	 */
	compileElement(node: HTMLElement) {
		let attrs = node.attributes
		;[...attrs].map(attr => {
			let { name, value } = attr
			if (getDirectiveType(name) > 0) {
				// 是预设的指令
				switch (getDirectiveType(name)) {
					case DirectiveType.SHOW_DIRECTIVE:
						showDirective(node, value, this.vm)
						break
					case DirectiveType.MODEL_DIRECTIVE:
						break
					case 10:
						let abbrDirective = name.slice(1)
						onDirective(node, value, this.vm, abbrDirective, this.app)
						break
					default:
						break
				}
			}
		})
		// 元素<div v-on:click="test()">{{title}}</div>
	}

	/**
	 * 编译文本
	 */
	compileText(node): void {
		let text = node.textContent
		// console.log('change!!')
		if (/\{\{(.+?)\}\}/.test(text)) {
			transferText(node, text, this.vm)
			//   compileTool['text'](node, text, this.vm);
		}
	}
}
export default Compile
