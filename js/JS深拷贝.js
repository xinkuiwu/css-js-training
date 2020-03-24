//深拷贝的三个方式
//递归
function deepClone(obj){
    var target = {};
    for(var key in obj){
        if(Object.prototype.hasOwnProperty.call(obj,key)){
            if(typeof obj[key] === 'object'){
                target[key] = deepClone(obj[key]);//引用类型
            } else {
                target[key] = obj[key];//基本类型
            }
            
        }
    }
    return target;
}

//JSON的方式
function deepCopyJSON(obj){
    let tmp = JSON.stringify(obj);
    let result = JSON.parse(tmp);
    return result;
}
//Object.creat()
function deepCopyCreat(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function(name){
        var desc = Object.getOwnPropertyDescriptor(obj,name);
        Object.defineProperty(copy,name,desc);
    });
    
    return copy;

}

var obj1 = { a: 1, b: {bc: 50, dc: 100, be: {bea: 1}} };
var obj2 = deepClone(obj1);//deepCopyCreat、deepCopyJSON函数的结果都一样
console.log(obj2)//Object {a: 1, b: Object}
obj1.a = 20;
console.log(obj1)//Object {a: 20, b: Object}
console.log(obj2)//Object {a: 1, b: Object}