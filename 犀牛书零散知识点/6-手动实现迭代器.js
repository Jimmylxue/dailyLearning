/**
 * for of 使用的是迭代器进行迭代，既然是迭代器 就自然少不了生成器 function*(){}
 *  生成器函数一定不会是 箭头函数加 * 形成
 *
 *  生成器函数执行 就会产生一个 迭代器
 *    迭代器有一个最关键的 next()迭代方法  通过这个方法可以获取到 value 和 done(是否迭代完成)
 *
 *  在执行for of的时候 我们可以理解成 for of 在执行中JS会自己替我们执行 [Symbol.iterator] 对应的生成器
 *    并且会自己帮我们执行next() 然后将 value 返回给我们
 *
 *  所以实现思路有两个：
 *    方法1：自己写一个 生成器函数 赋值给 [Symbol.iterator]
 *    方法2：将 [Symbol.iterator] 写成普通函数，但是执行之后也会返回一个 value 和 done(是否迭代完成) 的迭代结果的对象
 *
 *  还是方法1比较好，虽然不知道JS官方是数组的是怎么做的 不过大致猜一下应该跟方法1是比较像的
 *
 */

/**
 * 迭代器知识点：
 *  迭代器是生成器执行之后 会返回一个迭代对象，迭代对象就是我们说的迭代器
 *
 *  数组 字符串 集合 默认是含有迭代器的 还有一个是啥突然忘记了 在小黄书下册有看到过
 *  不过默认含有迭代器的是有四种的 这里我就记起来了三种  等想起来了再更新这里!!  打个断点！！！
 */

let obj = {
  name: "Jimmy",
  age: 22,
  sex: 1,
  // 手动添加 [Symbol.iterator] 迭代器
  // 方法1
  [Symbol.iterator]: function* () {
    let index = Object.keys(this);
    for (let i = 0; i < index.length; i++) {
      yield this[index[i]];
    }
  },
  // 方法2
  // [Symbol.iterator]: function () {
  //   let keys = Object.keys(this);
  //   let length = keys.length;
  //   let cur = 0;
  //   return {
  //     next: () => {
  //       return {
  //         value: this[keys[cur]],
  //         done: cur++ === length,
  //       };
  //     },
  //   };
  // },
};

for (const iterator of obj) {
  console.log(iterator); // Jimmy 22 1
}
