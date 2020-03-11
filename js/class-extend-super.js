//class 类与子类，extends,super

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }//相当于定义构造函数
　　　　　// 挂载到原型对象上，注意不要分开隔开
    Say() {  //这里相当于是原型对象定义公共方法
        console.log('I am  human')
    }
}
console.log(new Person('ss', 14))
new Person('ss', 14).Say()//I am  human
class Student extends Person {
    constructor(name, age, id) {
        super(name, age)//相当于继承父级的name,age。相当于ES5中call，绑定this为该子类student
        this.id = id
    }
}
console.log(new Student('ww', 14, 15))