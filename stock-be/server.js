const { request, response } = require('express');
const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();
require('dotenv').config();

const mysql2 = require('mysql2/promise');

let pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    // 限制 pool 連線數的上限
    connectionLimit: 10,
  });
//middleware = pipeline pattern

// 設定 express 處理靜態檔案
// -> express 內建 -> 不需要安裝任何東西
// localhost:3001/
// app.use(express.static('./static'));
// localhost:3001/2048/
app.use('/2048', express.static('./static'));

// function fnA(){
//     // TODO:...
//     fnB();
// }

// function fnB(){
//     // TODO:...
//     fnC();
// }

// function fnC(){
//     // TODO:...
//     fnA();
// }

//中間件
app.use((req, res, next) => {
    console.log('這裡是一個中間件 A');
    //TODO: 檢查是否已經登入
    req.mfee31 = "長頸鹿班"
    next();
});

app.use((req, res, next) => {
    console.log('這裡是一個中間件 B');
    req.dt = new Date().toISOString(); //記錄時間還能往下傳，所有路由中間件都能吃到req
    next();
});

// app.[Method]
// get, post, put, patch, delete, option, head
//路由中間件
app.get('/',(req, res, next) => {
    console.log('這裡是首頁',req.dt, req.mfee31);
    res.send('Hello Express 5');
});

app.get('/api',(req, res, next) => {

    res.json({
        name: 'John',
        age: 18,
    });
});

app.get('/api/stock',async (req, res, next) => {
    // let results = await pool.query('SELECT * FROM stock');
    // let data = results[0];

    let [data] = await pool.query('SELECT * FROM stocks');
    res.json(data)
})

app.use((req, res, next) => {
    console.log('這裡是一個中間件 C')
    next();
})


app.get('/test',(req, res, next) => {
    console.log('這裡是test頁面', req.dt);
    res.send('Hello Test');
});

//放在所有路由中間件的後面
// 前面所有路由都比不到對的網址時，就會調到這裡來
// --> 這就是一個 404 的情況
//利用了中間件會依照程式碼順序來執行的特性
app.use((req, res, next) => {
    console.log('這裡是404');
    res.send('沒有這個網站啦');
});


app.listen(3001, () => {
    console.log('Server running at port 3001') 
    //log是資源消耗，不可寫太多，寫太少無法得知錯誤在哪，加多加在哪一門學問
});