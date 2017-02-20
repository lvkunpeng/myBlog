/**
 * Created by 吕堃鹏 on 2017/2/14 0014.
 */
var express = require('express');
var router = express.Router();
var db = require('./mongodb');
//查询所有文章
router.get('/api/articleList', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  db.Article.find({}, null, {sort: {date: -1}}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  })
});
//查询特定id的文章详情
router.get('/api/articleDetails/:id', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  db.Article.findOne({_id: req.params.id}, function (err, data) {
    if (err) {
      return
    }
    res.send(data)
  })
});
router.post('/api/articleDetails', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  db.Article.findOne({_id: req.body.id}, function (err, data) {
    if (err) {
      return
    }
    res.send(data)
  })
});
//文章更新
router.post('/api/updateArticle', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  db.Article.find({_id: req.body.obj._id}, function (err, data) {
    if (err) {
      return
    }
    data[0].title = req.body.obj.title
    data[0].articleContent = req.body.obj.articleContent
    data[0].date = req.body.obj.date
    data[0].state = req.body.obj.state
    data[0].label = req.body.obj.label
    db.Article(data[0]).save(function (err) {
      if (err) {
        res.status(500).send();
        return
      }
      res.send()
    })
  })
});
// 增加新的文章
router.post('/api/saveArticle', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  new db.Article(req.body.obj).save(function (error) {
    if (error) {
      res.status(500).send()
      return
    }
    if (req.body.obj.state != 'draft') {
      db.Article.find({label: req.body.obj.label}, function (err, ArticleList) {
        if (err) {
          return
        }
        db.TagList.find({tagName: req.body.obj.label}, function (err, data) {
          if (data.length > 0) {
            data[0].tagNumber = ArticleList.length
            db.TagList(data[0]).save(function (error) {
            })
          }
        })
      })
    }
    res.send()
  })
});
//删除文章
router.get('/api/delete:id', function (req, res) {
  db.Article.remove({_id: req.params.id}, function (err, data) {
    if (err) {
      res.status(500).send();
      return
    }
    res.send({"status": 0})
  })
});
//增加标签
router.post('/api/addTap', function (req, res) {
  db.TagList.find({tagName: req.body.tagName}, function (err, data) {
    if (data&&data.length==0) { 
      new db.TagList(req.body).save(function (error, data) {
        if (error) {
          res.status(500).send()
        } else {
          res.send({"status": 0})
        }
      })
    }else {
      res.send({"status": 1})
    }
  })
});
//查询所有标签
router.get('/api/getTap',function (req,res) {
   db.TagList.find({}, null,  function (err, data){
     if(err){
       res.status(500).send()
     }
     res.send(data);
   })
});
//用户登录验证
router.post('/api/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  db.User.find({user: req.body.username}, function (err, data) {
    if (err) {
      res.send({'status': 1})
    }
    else {
      db.User.find({user: req.body.username, password: req.body.password}, function (err, data) {
        res.send({'status': 0})
      })
    }
  })
});

module.exports = router;
