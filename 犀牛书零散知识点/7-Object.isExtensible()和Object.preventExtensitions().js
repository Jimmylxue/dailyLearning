/**
 * Object.isExtensible() 判断一个对象是否是可拓展对象
 * Object.preventExtensions(); 将一个对象设置为不可扩展对象
 *
 * 细节：
 *  这个不可扩展是相对于对象自身的，我们任然是可以通过原型链的方式在原型上给不可以扩展的对象添加属性，添加之后这个对象照样可用
 */

const obj1 = {
  name: 'Jimmy',
  age: 22,
};

console.log(Object.isExtensible(obj1)); // true

const obj2 = {
  name: 'Jimmy',
  age: 22,
};

Object.preventExtensions(obj2);
console.log(Object.isExtensible(obj2)); // false

const obj3 = {
  name: 'Jimmy',
  age: 22,
};
/**
 * Object.defineProperty(对象，属性，特征)
 *  只是单独的设置一个对象某个属性 是否可写 可便利 可配置  本质上和 是否可拓展是两回事
 */
Object.defineProperty(obj3, 'name', {
  configurable: false,
});
obj3.name = 'hello';
console.log(Object.isExtensible(obj3)); // true

const obj4 = {
  name: 'Jimmy',
  age: 22,
};
obj4.demo = 'hello world';
console.log(obj4); // { name: 'Jimmy', age: 22, demo: 'hello world' }
Object.preventExtensions(obj4);
obj4.love = 'xuexue';
console.log(obj4.love); // undefined 设置为不可扩展之后 设置新对象是失败的
Object.prototype.love = 'xuexue';
console.log(obj4.love); // xuexue  可以通过原型链的方式  强制添加属性
