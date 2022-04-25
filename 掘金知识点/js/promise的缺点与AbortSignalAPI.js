/**
 * Promise 现在前端开发中基本是离不开了，各种优秀的库都有基于promise做一些逻辑的封装
 *  但是实际上promise也是有缺点的
 *
 *    promise一旦初始化，就不能中止。这是由promise的实现决定的
 *    promise有pending状态 reslove状态 热 reject状态 一旦进入pending状态 就不能取消这个状态
 *
 *  基于这个问题！ JS 提出了一个新的API
 *    AbortSignal
 *      AbortSignal是个实验性API，不过兼容性还不错，而且polyfill实现起来也不复杂。
 *      就像遥控器可以发出信号关电视一样，AbortController的实例可以控制中止信号。
 */

const controller = new AbortController();
const signal = controller.signal;

// 监听 abort 事件
signal.addEventListener("abort", () => {
  console.log("信号中止!");
});

// 控制器中止信号
controller.abort();

console.log("是否中止：", signal.aborted);

/**
 * 代码是在掘金上找的 这里为了方便学习喝复习 就复制进来了
 */
