let doWorkPromise = function(job, timer){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`);  //resolve呼叫.then((呼叫這裡)=>{})
        }, timer);
    })
  }
  
  let now = new Date();
  console.log(`工作開始 at ${now.toISOString()}`);
  
  brushPromise
    .then((data) =>{
        console.log(data);
        return doWorkPromise(`吃早餐`, 5000);
    }).then((data) =>{
        console.log(data);
        return doWorkPromise(`寫功課`, 3000);
    }).then((data) =>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })