<template>
  <div>
    <div class="content-panel-header">
      <h4 @click="goBack" style="cursor: pointer;">返回</h4>
    </div>
    <div class="content-panel-content">
      <div v-for="item in list">
        <div class="atticle-title atticle-details-title">{{item.title}}</div>
        <div style="color:#34495e" v-compiledMarkdown>{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js'
  import '../assets/atom-one-light.css'
  export default {
    data () {
      return {
        list: []
      }
    },
    mounted: function(){
      var id = this.$route.params.id;
      this.$http.get('http://localhost:9090/api/articleDetails/'+ id)
        .then(
          respone => {
            this.list.push(respone.body)
          },
          respone => console.log('错误'+respone)
        )
    },
    methods: {
      goBack: function(){
        this.$router.go(-1)
      }
    },
    directives: {
      compiledMarkdown: {
        bind: function(el){
          el.innerHTML = marked(el.innerText)
        }
      }
    }

  }
</script>

<style></style>
