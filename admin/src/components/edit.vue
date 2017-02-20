<template>
  <div>
    <div class="col-md-12 top">
      <div class="col-md-12">
        <input type="text" class="col-md-12 input" v-model="articleTitle">
      </div>
      <div class="col-md-12 middle">
        <img src="../assets/smtap.png" class="tap" alt="">
        <button v-show="danger" @click="deleteArticles" class="btn btn-sm btn-danger pull-right">删除文章</button>
        <button @click="publishedArticles" class="btn btn-sm btn-success pull-right">发布文章</button>
      </div>
      <div class="bar col-md-12">
        <textarea id="editor"></textarea>
        <!--<select class="form-control">
          <option>js</option>
        </select>-->
      </div>

    </div>
  </div>
</template>
<script>
  import SimpleMDE from 'simplemde';
  import '../assets/simplemde.css'
  import marked from 'marked';
  import highlight from 'highlight.js';
  export default {
    data(){
      return {
        articleTitle: '请输入文章标题',
        content: '',
        tags: [],
        list: [],
        danger: false,
      }
    },
    mounted: function () {
      var smde = new SimpleMDE({
        element: document.getElementById('editor'),
        autofocus: true,
        autosave: true,
        previewRender: function (plainText) {
          return marked(plainText, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
              return highlight.highlightAuto(code).value;
            }
          });
        },
      });
      var self = this;
      smde.codemirror.on("change", function () {
        var value = smde.value();
        self.content = value
      });
      if (this.$route.query.id) {
        this.$http.post('http://localhost:9090/api/articleDetails', {
          id: this.$route.query.id
        }).then(
          respone => {
            this.danger = true;
            this.articleTitle = respone.body.title,
              this.list.push({
                tagName: respone.body.label
              })
            smde.value(respone.body.content)
          },
          respone => console.log(respone)
        )
      } else {
        smde.value("快来开始写博客吧");
      }
    },
    methods: {
      deleteArticles: function () {
        this.$http.get('http://localhost:9090/api/delete'+this.$route.query.id).then(
          response=>{
            this.$emit('saveArticleInformation');
            this.$router.push({'path':'/list'})
          }
        )
      },
      publishedArticles: function () {
        var self = this;
        var labelName = null;
        if (this.$route.query.id) {
          // 更新
          if (this.list && this.list.length > 0) {
            labelName = this.list[0].tagName;
          } else {
            labelName = '未分类'
          }
          var obj = {
            _id: this.$route.query.id,
            title: self.articleTitle,
            content: self.content,
            date: new Date().format('yyyy-MM-dd hh:mm:ss'),
            state: 'publish',
            label: labelName
          }
          this.$http.post('http://localhost:9090/api/updateArticle', {
            obj: obj
          }).then(
            respone => {
              /*Message.success('文章发布成功')*/
              // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
              self.$emit('saveArticleInformation')
            },
            respone => {
              /* Message.error('文章发布失败，请重试')*/
            }
          )
        } else {
          // 新建发布
          if (this.list && this.list.length > 0) {
            labelName = this.list[0].tagName
          } else {
            labelName = '未分类'
          }
          var obj = {
            title: self.articleTitle,
            content: self.content,
            date: new Date().format('yyyy-MM-dd hh:mm:ss'),
            state: 'publish',
            label: labelName
          }
          this.$http.post('http://localhost:9090/api/saveArticle', {
            obj: obj
          }).then(
            respone => {
              /*Message.success('文章发布成功')*/
              // 如果文章信息保存成功就给父组件派发一个事件通知它刷新文章列表
              self.$emit('saveArticleInformation')
            },
            respone => {
            }
          )
        }
      },
      selectTag: function (data) {
        this.list = []
        this.list.push(data)
      },
      handleClose: function (tag) {
        this.list.splice(this.tags.indexOf(tag), 1);
      }
    }
  }
</script>
<style>
  * {
    color: rgb(53, 73, 94);
  }

  .col-md-8 {
    padding-left: 0;
    padding-right: 0;
  }

  .top {
    height: 40px;
  }

  .input {
    border: none;
    outline-style: none;
    height: 43px;
    padding-left: 10px;
    font-size: 20px;
  }

  .middle {
    border-bottom: 1px solid #eeeeee;
    height: 50px;
    border-top: 1px solid #eeeeee;

  }

  .tap {
    margin-left: 10px;
    margin-top: 1%;
  }

  .pull-right {
    margin-right: 10px;
    margin-top: 5px;
  }

  .bar {
    height: 50px;
    border-bottom: 1px solid #eeeeee;
  }

  .CodeMirror {
    border-bottom: none !important;
    border-left: none !important;
    border-right: none !important;
    border-top: 1px solid #f1f1f1 !important;
  }

  .editor-toolbar {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-left: none !important;
    border-right: none !important;
    border-top: 1px solid #f1f1f1 !important;
  }

  .editor-statusbar {
    display: none;
  }
</style>
