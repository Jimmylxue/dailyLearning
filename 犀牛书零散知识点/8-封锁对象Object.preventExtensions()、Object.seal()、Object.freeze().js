/**
 * 想要封锁一个对象（禁止扩展）的方法是有三种，且其作用的限制的范围也是由浅入深的，它们依次是： 禁止扩展 => 封存 => 冻结
 *  Object.preventExtensions()
 *      禁止扩展，但是可以删除或者配置已有的属性
 *    Object.isExtensible() 判断是否是扩展对象  false 表示的是不是可扩展对象
 *  Object.seal()
 *      禁止扩展，不能删除和配置已有属性，不过可写的依然是可写的
 *    Object.isSeal() 判断是否是被封存对象  true 表示是一个封存对象
 *  Object.freeze()
 *      这个是力度最大的，禁止所有配置操作，同时对象不能扩展，自身所有属性变成只读属性
 *    Object.isFrozen() 判断是否是冻结对象   true 表示是一个冻结对象
 */

let obj1 = {
  name: 'Jimmy',
  age: 22,
};
Object.preventExtensions(obj1);
delete obj1.name;
console.log(obj1); // { age: 22 }
console.log(Object.isExtensible(obj1)); // false  这里的false表示的是 是否是可扩展对象  false表示不是

let obj2 = {
  name: 'Jimmy',
  age: 22,
};
Object.seal(obj2);
Object.defineProperty(obj2, 'name', {
  writable: false,
});
obj2.name = 'xuexue';
console.log(obj2); // { name: 'Jimmy', age: 22 }  写入失败 对象本身是不可配置的
console.log(Object.isSealed(obj2)); // false

let obj3 = {
  name: 'Jimmy',
  age: 22,
};
Object.freeze(obj3);
obj3.name = 'hello';
console.log(obj3); // 修改失败 如果在浏览器中查看会发现在合格对象是属性都是只读的
console.log(Object.isFrozen(obj3)); // true
