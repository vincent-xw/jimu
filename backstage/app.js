const express = require('express');
const app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
// 加载接口配置
let interface_config = require("./method/interface");

interface_config(app);


// //测试加密解密

// let encrypt = require("./method/encrypt");

// var aaa = encrypt().cipher("jiaxuewen");
// // encrypt().decipher("jiaxuewen");
// encrypt().decipher(aaa);
// 连接数据库

// let dbConf = require("./method/conf");

// dbConf().insert({name:"jiaxuewen",age:25});


// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);
// 指定静态资源目录
app.use(express.static('src'));

const router = require("./method/router");
const routers = router(app);
app.listen('3000', function () {
  console.log('Example app listening on port 3000!')
})