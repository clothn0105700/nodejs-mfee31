
const axios = require('axios');

const fs = require('fs/promises');

const moment = require('moment');

// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
// 2618, 2330, 2412

(async () => {
  try {
    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    console.log(stockNo);
    let date = moment().format('YYYYMMDD');
    console.log(date);
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });

    console.log('await', response.data);
  } catch (e) {
    console.error(e);
  }
})();