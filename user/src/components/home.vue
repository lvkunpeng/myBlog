<template>
  <div>
    <ul v-for="item in articleList">
      <li>
        <div class="content-panel-header">
          <div href="" class="title" @click="articleDetails(item._id)">{{item.title}}</div>
          <span>{{new Date(item.date).format('yyyy-MM-dd hh:mm:ss')}}</span>
        </div>
        <div class="content-panel-content">
          <p v-compiledMarkdown>{{item.content}}</p>
        </div>
        <div class="content-panel-footer">
          <div class="seeAll" href="" @click="articleDetails(item._id)">...点击查看全文</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js'
  export default {
    data () {
      return {
        articleList: [],
      }
    },
    directives: {
      compiledMarkdown: {
        bind: function (el) {
          el.innerHTML = marked(el.innerText);
          el.innerHTML = el.innerText.substr(0,180)+'......';
          if (el.querySelector('pre')) {
            el.querySelector('pre').style.display = "none"
          }
          if (el.querySelector('blockquote')) {
            el.querySelector('blockquote').style.display = "none"
          }
        }
      }
    },
    mounted: function () {
      Date.prototype.format = function (format) {
        var o = {
          "M+": this.getMonth() + 1, //month
          "d+": this.getDate(), //day
          "h+": this.getHours(), //hour
          "m+": this.getMinutes(), //minute
          "s+": this.getSeconds(), //second
          "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
          "S": this.getMilliseconds() //millisecond
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
      if (this.$route.query.tagId) {
        this.$http.post('/api/articleList', {
          tagId: this.$route.query.tagId
        }).then(
          response => this.articleList = response.body.reverse(),
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
      articleDetails: function (id) {
        this.$router.push('/details'+id+'')
      }
    }
  }
</script>

<style>
  span {
    color: #7f8c8d;
    font-weight: 600;
  }

  .content-panel-header {
    margin-bottom: 8px;
  }

  .seeAll {
    color: #42b983;
    font-weight: 600
  }

  .seeAll:hover {
    cursor: pointer;
  }

  .content-panel-footer {
    margin-bottom: 30px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-bottom: 15px;
    color: rgb(44, 62, 80);
  }

  .title:hover {
    cursor: pointer;
  }
/*
  p {
    height: 30px;
    line-height: 20px;
    margin-bottom: 10px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: break-all
  }*/


</style>
