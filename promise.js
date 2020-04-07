new Promise((resolve,reject)=>{
    setTimeout(()=>{
        //resolve('hello');
        reject('error');
    },1000)
}).then(data =>{
    console.log(data);
}).catch(err => {
    console.log(error);
})