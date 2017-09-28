const express = require('express');
const app = express();

// 加载接口配置
let interface_config = require("./method/interface");

interface_config(app);

// 连接数据库

let dbConf = require("./method/conf");

dbConf();

app.listen('3000', function () {
  console.log('Example app listening on port 3000!')
})