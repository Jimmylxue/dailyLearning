/**
 * 根据机型的比例 将px 转为 rem
 * @param {number} px
 * @param {number} screenWidth
 * @returns number
 */

export default function px2rem(px, screenWidth) {
	const scale = screenWidth / 375 // 375 可以做调整，一般情况下设计稿均为375宽
	return px * scale
}
