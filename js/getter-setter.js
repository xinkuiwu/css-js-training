var o  = {
    get x(){
         return 7;
    },
    set x(val){
        console.info("不能设置x的值");
    }
    }
    
    o.x    //7    读取x值的时候，会使用get方法
    
    o.x = 9  //不能设置x的值      赋值x时，会使用set方法
//不包含get/set的原型

function p(){}

p.prototype.z = 9;

var p1 = new p();

p1.z  //9    //对象上没有属性，将在原型链上查找

p1.z = 10;    //原型上不包含get/set方法时，向原型上的同名属性赋值，会在对象上添加此属性

p1.z //10     //对象上能够找到属性，将不会在原型链上查找
//原型上包含get/set方法

function person(){}

Object.defineProperty(person.prototype,'z',{get:function(){return 1}});


var p = new person();

p.z  //1

p.z = 89;

p.z  //still 1     原型链上get/set方法，操作此属性的时候，会向上查找原型链。 所以p.z仍旧是1
//那个问题来了，在原型链上有get/set方法的时候，怎么实现在对象上添加此属性呢？  

function foo(){}

Object.defineProperty(foo.prototype,'z',{get:function(){return 1}})

var f = new foo();

f.z  //1

f.z = 2;

f.z   //still 1
//对实例进行Object.defineProperty，在实例上添加z属性
Object.defineProperty(f,'z',{value:100,configurable:true,writable:true});

f.hasOwnProperty('z')  //true 判断自己本身是否有z属性

f.z  //100

f.z = 90;

f.z  //90

delete f.z  //true

f.hasOwnProperty('z')   //false

f.z   //1  回到原型链查找

