import { getVal } from './compileTools'
import { baseConfig } from './baseInterface'

export function textUpdate(node: HTMLElement, text: string): void {
	node.textContent = text
}

export function showUpdate(
	node: HTMLElement,
	vm: baseConfig,
	reactive: string
): void {
	console.log(getVal(vm, reactive), 'flag')
	if (getVal(vm, reactive)) {
		node.style.display = 'block'
	} else {
		node.style.display = 'none'
	}
}
