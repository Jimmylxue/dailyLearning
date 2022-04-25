/**
 * 模块机制
 *  这个模块化的方式非常的棒 初次看有点类似于看框架源码的感觉了
 *  最开始看还是有点迷糊的 甚至看不太懂  但是跟着打下来发现 真的是存在着很多的精髓
 *  收获非常的大
 */

var MyModules = (function () {
  var modules = {};
  /**
   *
   * @param {String} name 模块名称
   * @param {Array} deps 模块的依赖
   * @param {Function} impl 模块内容
   */
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
      // foo
    }
    /**
     * {
     *  'bar':function(){...},
     *  'foo':function(){...}
     * }
     */
    modules[name] = impl.apply(impl, deps);
  }
  function get(name) {
    return modules[name];
  }
  return {
    define,
    get,
  };
})();

MyModules.define('bar', [], function () {
  function hello(who) {
    return `Let me introduce: ${who}`;
  }
  return {
    hello,
  };
});

MyModules.define('foo', ['bar'], function (bar) {
  var hungry = 'hippo';
  function awesome() {
    /**
     * 这里之所以能够直接用 bar 这个模块是因为内部实现很关键的一段代码
     *  deps[i] = modules[deps[i]];
     * modules[name] = impl.apply(impl, deps); 实现了能够模块化的引用
     */
    console.log(bar.hello(hungry).toUpperCase());
  }
  return {
    awesome,
  };
});

var bar = MyModules.get('bar');
var foo = MyModules.get('foo');

console.log(bar.hello('hippo'));

foo.awesome();
