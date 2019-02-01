/*
*桌台相关的路由器
*/
const express = require('express');
const pool = require('../../pool');
var router = express.Router();
module.exports = router;

/*
*GET  /admin/table
*获取所有的桌台信息
*返回数据：
*   [
*     {tid:xxx, tname:'xxx', status:''},
*     ...
*   ]
*/
router.get('/', (req, res)=>{
  pool.query('SELECT * FROM xfn_table ORDER BY tid', (err, result)=>{
    if(err)throw err;
    res.send(result);
  })
})
