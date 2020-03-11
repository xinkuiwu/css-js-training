//构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}
//在原型对象中添加属性或者方法
Person.prototype.sex = '男'; 
var person1 = new Person('Mike',10); //创建实例
var person2 = new Person('Alice',20);
console.log(person1);//Person {name: "Mike", age: 10}
//只给person2设置性别
person2.sex = '女';
console.log(person1.sex)  // '男'
console.log(person2.sex)  //'女' 
//解释：这里我们没有给person1实例设置sex属性，
//但是因为[Protoptype]的存在，会访问原型对象中对应的属性；
//同时我们给person2设置sex属性后输出的是'女',说明只有当实例本身不存在对应的属性或方法时，才会去找原型对象上的对应属性或方法
console.log(Person === Person.prototype.constructor)//true，即构造函数的原型的constructor指向构造函数本身
console.log(Person.prototype=== person1.__proto__)//true,实例的原型指向构造函数的原型，注意是__proto__而不是_proto_

//原型链相关
var a = {};
console.log(a.prototype); //undefined
console.log(a.__proto__); //Object {}

var b = function() {}
console.log(b.prototype); //b {}
console.log(b.__proto__); //function() {}
 /*1、字面量方式*/
 var a = {};
 console.log(a.__proto__); //Object {}

 console.log(a.__proto__ === a.constructor.prototype); //true

 /*2、构造器方式*/
 var A = function() {};
 var b = new A();
 console.log(b.__proto__); //A {}

 console.log(b.__proto__ === b.constructor.prototype); //true

 /*3、Object.create()方式*/
 var a1 = {
     a: 1
 }
 var a2 = Object.create(a1);
 console.log(a2.__proto__); //Object {a: 1}

 console.log(a2.__proto__ === a2.constructor.prototype); //false（此处即为图1中的例外情况）
//原型链
Function.prototype.age = 20;
let c = function() {};//c是一个函数
c.prototype.age = 10;//这个是函数的原型设置属性age为1
console.log(c.__proto__ === Function.prototype);//true,具体函数的原型指向Function.prototype
console.log(c.age)//输出20,因为其age是从其__proto__上继承下来，即Function.prototype那里，而不是自身的c.prototype.age
//__proto__原型链
var A = function() {};
var a = new A();
console.log(a.__proto__); //A {}（即构造器function A 的原型对象）
console.log(a.__proto__.__proto__); //即构造器function Object() 的原型对象
console.log(a.__proto__.__proto__.__proto__); //null,原型链终点
//函数自带prototype属性和length属性
console.log(Object.prototype); //=> {} 

console.log(Function.prototype); //=> [Function: Empty] 

console.log(String.prototype); //=> [String: '']
