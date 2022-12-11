const fs = require('fs');

let readfile = new Promise((resolve, rejects) => {
    fs.readFile('test.txt', 'utf-8', (err, data) => {
        if (err) {  
            rejects(err);
          } else {
            resolve(data);
          }
      });
});

// readfile.then((data) => {
//     console.log('我是then', data)
// }).catch((err) => {
//     console.error('我是catch', err)
// })

//立即執行函示，前者要加分號，不然可能發生錯誤
(async() => {
    try{
    let data = await readfile
    console.log(data);
    } catch(e){
        console.log(e)
    }
})();