/**
 * Created by 吕堃鹏 on 2017/2/14 0014.
 */
let express = require('express');
let fs = require('fs');
let path = require('path');
let router = require('./server/router');
let bodyParser = require('body-parser');
let mime = require('mime');
var resolve = file => path.resolve(__dirname, file);
let app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers','content-type');
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");

  next();
});
app.use('/dist', express.static(resolve('./dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

app.use(router);
app.listen(9090, function () {
  console.log('9090已经正常监听')
});
