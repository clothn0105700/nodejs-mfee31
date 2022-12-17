const { request, response } = require('express');
const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

//middleware = pipeline pattern

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
});