let performance =
  window.performance || window.msPerformance || window.webkitPerformance;

function listenChange() {
  if (performance) {
    console.log(`url：${window.location.href}`);
    console.log("总体情况", performance);
    console.log("------------------------------------------------------");
    console.log("内存情况");
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } =
      performance.memory;
    console.log(`内存使用情况：
      已使用：${usedJSHeapSize}
      总内存大小：${totalJSHeapSize}
      内存占比：${((usedJSHeapSize / totalJSHeapSize) * 100).toFixed(2)}%
      内存大小限制：${jsHeapSizeLimit}
    `);
    if (usedJSHeapSize > totalJSHeapSize) {
      console.log(`%c 发生内存泄漏！！！`, "font-size:30px;color:red");
    }
    console.log("------------------------------------------------------");
    console.log("来源信息");
    const { redirectCount, type } = performance.navigation;
    console.log(`重定向次数：${redirectCount}`);
    let way = getWay(type);
    console.log(`页面进入方式：${way}`);
    console.log("------------------------------------------------------");
    console.log("页面时间加载情况");
    const {
      redirectEnd,
      redirectStart,
      domainLookupEnd,
      domainLookupStart,
      connectEnd,
      connectStart,
      responseEnd,
      responseStart,
      domComplete,
      domInteractive,
      navigationStart,
      domContentLoadedEventEnd,
      loadEventEnd,
    } = performance.timing;
    let redirectTime = {
      name: "重定向耗时",
      time: `${redirectEnd - redirectStart}ms`,
    };
    let DNSTime = {
      name: "DNS查询耗时",
      time: `${domainLookupEnd - domainLookupStart}ms`,
    };
    let tcpLinkTime = {
      name: "TCP链接耗时",
      time: `${connectEnd - connectStart}ms`,
    };
    let httpTime = {
      name: "HTTP请求耗时",
      time: `${responseEnd - responseStart}ms`,
    };
    let DOMAnalysis = {
      name: "解析dom树耗时",
      time: `${domComplete - domInteractive}ms`,
    };
    let whiteTime = {
      name: "白屏时间耗时",
      time: `${responseStart - navigationStart}ms`,
    };
    let DOMreadyTime = {
      name: "DOMready耗时",
      time: `${domContentLoadedEventEnd - navigationStart}ms`,
    };
    let onloadTime = {
      name: "onload耗时(onload回调函数执行的时间)",
      time: `${loadEventEnd - navigationStart}ms`,
    };
    console.table([
      redirectTime,
      DNSTime,
      tcpLinkTime,
      httpTime,
      DOMAnalysis,
      whiteTime,
      DOMreadyTime,
      onloadTime,
    ]);
  }
}

function getWay(type) {
  let str = "";
  switch (type) {
    case 0:
      str = "正常进入";
      break;
    case 1:
      str = "刷新页面进入";
      break;
    case 2:
      str = "通过历史进入（浏览器前进后退）";
      break;
    default:
      str = "非以上方式进入的页面";
      break;
  }
  return str;
}

window.addEventListener("popstate", () => {
  /**
   * window.requestIdleCallback(callback)
   *  callback 会在浏览器的空闲时间中运行，简单的理解就是不会去影响浏览器加载数据。
   *  这个API一般是用于做一些数据上报的，正常的一些数据上报，比如错误上报是属于程序显示以外的东西
   *   不应该跟程序内部需要第一时间展示的内容抢浏览器的资源的，如果抢了就会影响主线程的渲染。
   *   这个也就是为什么要使用 这个API的原因，
   *
   *  当然这个API有一定的兼容性 需要做适配 如果没有就简单的模拟一个 setTimeout 异步上报即可
   *
   *  主要的方向是：
   *    使用了requestIdleCallback：
   *     监听事件处理 --> 页面渲染 --> 数据上报（空闲时）
   *   不使用的情况下：
   *     监听事件处理 --> 数据上报（被添加到主线程中） --> 监听事件处理 --> 数据上报（被添加到主线程中）
   *
   *
   */
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      listenChange();
    });
  } else {
    setTimeout(() => {
      listenChange();
    }, 0);
  }
});
