# px2rem

当我们做移动端需要适配不同屏幕尺寸的手机，这时候如果使用 px 就达不到响应式的效果，要达到响应式的效果，我们就需要知道设计稿上的宽度，在不用尺寸下屏幕时的宽度具体应该是多少。

这点我们就只要封装一个简单的方法来计算一下就好啦~，理论知识就是数学上的 “相似” 的知识啦~

```js
export default function px2rem(px, screenWidth) {
	const scale = screenWidth / 375 // 375 可以做调整，一般情况下设计稿均为375宽
	return px * scale
}
```

简单的方法就写好了，说下它的应用场景吧：

当我们在移动端开发 canvas 时就会需要用到它！canvas 的 API 涉及的单位都是 canvas，所以我们就需要在输入 px 的地方都使用`px2rem`方法处理之后再传递给 canvas 的 api
