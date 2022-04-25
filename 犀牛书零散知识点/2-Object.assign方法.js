let obj1 = {
	name: 'JIMMY',
	age: 22,
}

let obj2 = {
	name: 'XUEXUE',
	friends: 'nike',
}

let obj3 = Object.assign(obj1, obj2)
console.log('obj3', obj3)
obj3.name = 'change!!'
console.log('obj1', obj1)
console.log('obj3', obj3)

/**
 * Object.assign() 方法是用于合并两个对象的 接收至少两个参数
 *  会返回并修改第一个参数
 *  细节：返回的数据和第一个参数是同一个对象，他们指向的是同一个地址（本质浅赋值）
 *
 *  ES6推出的方法，但是也并不是很推荐使用，主要是会影响了原对象（方法的第一个对象参数）
 *    最好还是可以i使用 let obj4 = {...obj1,...obj2}的方式实现合并 并且这个是深复制
 */
