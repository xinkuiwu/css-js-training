//ES6的class
class A {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    } //A类的属性
      say() {
        console.log(`${this.name}是${this.age}岁`);//点引号``
      } //方法定义的简写，相当于ES6中的say：function(){XXX}
      //相当于在其原型对象定义一些公用方法，其类的实例，继承该方法
  }
  let A1 = new A('wu',19);//new 相当于执行构造函数
  console.log(A1);//{name: "wu", age: 19}
  A1.say();//wu是19岁
  class B extends A {
    constructor(name,age,money){
      super(name,age);//继承父类的属性，super相当于使用bind改变this指向
      this.money = money;
    }
    talk() {
      console.log(`我的工资是${this.money}`);
    }//B类的方法
  }
  let B1 = new B('liu',20,4000);
  console.log(B1);//{name: "liu", age: 20, money: 4000}
  B1.talk();//我的工资是4000
  B1.say();//liu是20岁
  
  //用ES5的原型链实现类
  function AA(name,age) {
    this.name = name;
    this.age = age;//内部属性
  }
  
  AA.prototype = {
    say() {
      return console.log(`${this.name}是${this.age}岁`)
    }
  }//在AA原型对象中，写入公方法
  
  let AA1 = new AA('qi',21);
  console.log(AA1);//{name: "qi", age: 21}
  AA1.say();//从原型对象继承
  
  AA1.saySomething = function(){
    return console.log(`${this.name}是${this.age}岁,多美好啊`)
  }//AA1的自己的方法
  //注意定义的saySomething不要写成saySomething();
  
  AA1.saySomething();//qi是21岁,多美好啊