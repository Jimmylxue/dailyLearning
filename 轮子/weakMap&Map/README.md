## Map与WeakMap 的区别

二者对标的数据类型都是对象类型 => 存储的键值对

### 优势
- 有更加优雅&灵活的api用于增删改查
- 不会触发原型链的查找

过去其实一直不知道map与weakMap的区别，或者说看过书面的官方解释，也背过面试题，知道weakMap存储的是弱类型的key，那么到底什么是若类型的key呢？

**什么是弱类型**

我们都知道的字符串，数字这种属于值类型，弱类型我的简单理解就是、对象、函数。

所以基于这一点，我们就知道，weakMap的key只能是存弱类型，就不能存储字符串或者数字之类的作为key，而这个map可以

**不会发生内存溢出**

一个简单的例子过一下就能完全理解了！
```js
  const map = new Map()
  const wMap = new WeakMap()

  (() => {
    const foo = { foo: 1 }
    const bar = { bar: 2 }

    map.set(foo, 1)
    map.set(2, 1)
    wMap.set(bar, 1)
    // wMap.set(3, 1) // 报错，key必须是弱类型

    /**
     * WeakMap 是弱引用， 一旦表达式执行结束，垃圾回收就会把 bar 从内存中移除，所以无法从 weakMap中取到bar
     *  一旦被垃圾回收机制回收了，就无法获取到对应的 键和值了
     */
  })()

  console.log(map, map.keys()) // 依旧有办法获取 键和值
  console.log(wMap) // 已经无法获取键和值了，因为是弱引用，已经被垃圾回收机制所回收了

```

**总结**

理解了Map与weakMap之后只需要知道今后在项目开发中根据场景来选择即可