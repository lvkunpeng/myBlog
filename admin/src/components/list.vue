<template>
  <div class="col-md-12">
    <div class="col-md-3">
      <p><img src="../assets/top.png" alt="">文章列表
        <router-link to="/edit"><img src="../assets/add.png" alt="" class="add"></router-link>
      </p>
      <ul>
        <li v-for="item in articleList">
          <h3 @click="readArticle(item._id)">{{item.title}}</h3>
          <span>{{new Date(item.date).format('yyyy-MM-dd hh:mm:ss')}}</span>
        </li>
      </ul>
    </div>
    <div class="col-md-9">
      <transition name="fade" >
        <router-view @saveArticleInformation='refreshArticleList'>
        </router-view>
      </transition>
    </div>
   <!-- <div class="alert alert-success success alert-dismissible col-md-2" role="alert" v-show=data.button>文章上传成功!</div>-->
  </div>
</template>
<script>
  export default {
    data(){
      return {
        articleList: [],
        button: false
      }
    },
    mounted: function () {
      Date.prototype.format = function (format) {
        var o = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }
        return format;
      }
    }, created: function () {
      if (this.$route.query.labelTitle) {
        this.$http.post('api/admin/articleList', {
          label: this.$route.query
        }).then(
          respone => this.articleList = respone.body.reverse(),
          respone => console.log(respone)
        )
      } else {
        this.fetchData()
      }
    },
    methods: {
      fetchData: function () {
        this.$http.get('http://localhost:9090/api/articleList').then(
          response => {
            this.articleList = response.body;
          },
          response => console.log('error' + response)
        )
      },
      readArticle: function (id) {
        this.$router.push('/read' + id)
      },
      refreshArticleList: function () {
        var _this = this;
        this.$http.get('http://localhost:9090/api/articleList').then(
          respone =>   this.articleList = respone.body.reverse()
        )
      }
    }
  }
</script>
<style>
  ul {
    list-style: none;
  }

  .col-md-3 {
    height: 100%;
    padding-left: 0;
    border-right: 1px solid #eeeeee;
    padding-right: 0;
  }

  .col-md-3 p {
    border-bottom: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    height: 50px;
    margin-top: 10px;
    font-size: 20px;
    line-height: 50px;
  }

  .col-md-3 img {
    margin-right: 10px;
    margin-left: 15px;
    width: 25px;
    height: 25px;
  }

  .col-md-3 span {
    font-size: 12px;
    color: #b3bbbc;
  }

  .col-md-3 ul {
    padding-left: 0;
  }

  .col-md-3 li {
    border-bottom: 1px solid #eeeeee;
    padding-top: 5px;
    padding-left: 15%;
  }

  .col-md-3 li:hover {
    background-color: rgb(245, 245, 245);
  }

  .col-md-3 li span {
    display: block;
    margin-bottom: 8px;
  }

  h3 {
    margin-top: 0;
  }

  p {
    margin-bottom: 0;
    position: relative;
  }

  .col-md-3 .add {
    position: absolute;
    top: -200px;
  }

  .col-md-9 {
    padding-left: 0;
    padding-right: 0;
  }

  .success {
    position: fixed;
    top: 8%;
    left: 50%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    display: none;
    padding: 0;
  }
</style>
