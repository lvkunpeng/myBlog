let mongoose = require('mongoose');
mongoose.Promise = Promise;
//连接数据库  mongodb://ip:端口号/数据库名字
mongoose.connect('mongodb://127.0.0.1/myBlog');
let articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  label: String,
  State: String
});
var tagSchema = new mongoose.Schema({
  tagName: String,
  tagNumber: Number,
});
var userSchema = new mongoose.Schema({
  username: String,
  passWord: Number,
});
var Models = {
  Article: mongoose.model('Article', articleSchema),
  TagList: mongoose.model('TagList',tagSchema),
  User:mongoose.model('User',userSchema),
};

module.exports = Models;
