const mysql2 = require('mysql2/promise');

(async () => {
  const connection = await mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'stock_mfee31',
  });

  // simple query
  //   let result = await connection.query('SELECT * FROM `stocks`');
  let [data,field] = await connection.query('SELECT * FROM `stocks`'); //解構寫法
  //   let data = result[0];
  // console.log(result);
  console.log(data);

  connection.end();
})();