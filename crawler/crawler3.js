// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const util = require('util');
const fs = require('fs');
const axios = require('axios');

// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
// Promise 是一個表示非同步運算的最終完成或失敗的物件。
let stock = new Promise((resolve, reject) => {
    // error-first callback
    fs.readFile('stock.txt', 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });



(async() => {
    try{
    let stockNo = await stock;
    let date = '20221211';
    let response = await axios
    .get('http://54.71.133.152:3000/stocks', {
        params: {
            stockNo,
            date,
            },
        })
    console.log(response.data);
    } catch(err){
        console.log(err);
    }
})();
