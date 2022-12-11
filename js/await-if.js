let doWorkPromise = function(job, timer){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`);  //resolve呼叫.then((呼叫這裡)=>{})
            // reject("失敗")
        }, timer);
    })
  }
  
  let now = new Date();
  console.log(`工作開始 at ${now.toISOString()}`);
  
  (async() => {
    try{
    let data = await doWorkPromise(`刷牙`, 1000);
    console.log(data);

    let data2 = await doWorkPromise(`吃早餐`, 3000);
    console.log(data2);

    let data3 = await doWorkPromise(`寫功課`, 1000);
    console.log(data3)
    } catch(err){  //catch(err)會抓到reject()
        console.log(err);
    }
  })()

  
