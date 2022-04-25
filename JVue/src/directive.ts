export const enum DirectiveType {
	/**
	 * 常规的指令：由 v- 开头
	 *  v-show
	 */
	SHOW_DIRECTIVE = 1,

	/**
	 * v-if
	 */
	IF_DIRECTIVE = 2,

	/**
	 * v-moder
	 */

	MODEL_DIRECTIVE = 3,

	/**
	 * 简写的指令： @
	 *  例如 @click
	 */
	ABBR_DIRECTIVE = 10, //

	/**
	 * 不是指令
	 */
	NONE_DIRECTIVE = -1,
}
