// let bollean1 = false

// let bollean2 = new Boolean(false)

// console.log('comming', bollean1, bollean2)

// console.log('first', bollean1 && true) // false
// console.log('second', bollean2 && true) // true  这个之所以是true的原因是 bollean2 是通过构造函数创建的对象，本质上是一个对象

/*
  对象在 布尔表达式中永远都为true
*/

// console.log(0.1 + 0.2)

let num = 1.56

console.log(Number.isInteger(num))

console.log(String(num).split('.'))
