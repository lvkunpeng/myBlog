<template>
  <div class="col-md-12">
    <div class="artivcle-preview">
      <transition name="fade">
        <div v-for="item in list" v-if="list.length>0">
          <div class="atticle-title">{{item.title}}</div>
          <div style="color:#34495e" v-compiledMarkdown>{{item.content}}</div>
          <div class="article-preview-footer">
            <button class="btn btn-danger" @click="modify(item._id)">不满意，点此修改</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js'
  export default{
    data(){
      return {
        list: [],
      }
    },
    created () {
      this.fetchData()
    },
    mounted: function () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      });
    },
    methods: {
      fetchData: function () {
        var id = this.$route.params.id;
        this.list = [];
        this.$http.get('http://localhost:9090/api/articleDetails/' + id).then(
          respone => {
            this.list.push(respone.body)
          },
          respone => console.log('错误' + respone)
        )
      },
      modify: function (id) {
        this.$router.push({path: '/edit', query: {id: id}})
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    directives: {
      compiledMarkdown: {
        bind: function (el) {
          el.innerHTML = marked(el.innerText)
        }
      }
    }
  }
</script>

<style>
  .article-preview-footer {
    position: fixed;
    right: 20px;
    bottom: 30px;
  }

  .artivcle-preview {
    padding: 15px;
  }

  .atticle-title {
    font-size: 22px;
    cursor: pointer;
    border-left: 3px #a0a0a1 solid;
    padding-left: 10px;
    color: #2c3e50;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
