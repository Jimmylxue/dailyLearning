# 防抖和节流

防抖和节流是两个比较重要的性能优化知识点，在面试的时候也是一个相对比较高频的点，虽然在开发中我们可能会比较喜欢用`lodash`这种工具库封装好的方法，但是也需要知道应该如何使用，以及他们的基本概念：

## 防抖

一系列的操作只以最后一次操作为准！

可以使用`setTimeout`来实现防抖的功能：

```js
function debounce(fn, delay) {
	let timer
	return (...args) => {
		if (timer) {
			clearTimeout(timer)
		}

		// 重新调用setTimeout
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}
```

常见的案例：

- 输入框联想搜索商品

  会短时间内监听最后一次输入，将这次输入之后的文本做一些商品匹配

- ...

## 节流

一系列操作只以第一次操作为准！（一段时间内最多只会执行一次）

涉及时间，所以判断当前时间和上一次操作的时间间隔是否符合节流时间，如果在时间内则不执行，否则重新执行方法并刷新下次限定的时间：

```js
function throttle(fn, delay) {
	let timeout = 0
	return (...args) => {
		const now = +Date.now()
		if (now > timeout + delay) {
			timeout = now
			fn.apply(this, args)
		}
	}
}
```

常见的案例：

- 监听滑动，第一时间展示小图标

  > 当滚动至顶部，出现特殊区域，不在顶部时，自动关闭显示特殊区域

- 埋点需求

  > 监听用户一段时间内的一些操作

- ....

## 其他

以上的实现代码都使用 **闭包** 的特性，因为防抖和节流函数自身都是有状态的，在上面的例子分别是`timer`、`timeout`，使用闭包的特性是最好的，不会被外界环境所污染。