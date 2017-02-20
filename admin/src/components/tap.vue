<template>
  <div class="all">
    <div class="col-md-3">
      <p><img src="../assets/top.png" alt="">标签管理 <img src="../assets/add.png" alt="" class="add" @click="tagShow"></p>
      <ul>
        <li v-for="item in tagNameList">
          <img src="../assets/tap.png" alt="">
          <h3>{{item.tagName}}</h3>
        </li>
      </ul>
      <div v-if="isTagShow" class='tagShow'>
        <div class="col-md-9">
          <input type="text" class="form-control col-md-6" placeholder="请输入标签名" v-model="tagName">
        </div>
        <button class="btn btn-success btn-sm" @click='push'>确认</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        isTagShow: false,
        tagNameList:[],
        tagName:'',
      }
    },
    mounted:function(){
      this.refreshTag();
    },
    methods: {
      tagShow: function () {
        this.isTagShow = true
      },
      push: function () {
        this.isTagShow = false;
        if(this.tagName !== ''){
          this.$http.post('http://localhost:9090/api/addTap', {tagName: this.tagName
          }).then(response=> {this.refreshTag()})
        }
      },
      refreshTag:function () {
        this.$http.get('http://localhost:9090/api/getTap').then(
          response=>{
            this.tagNameList = response.body
          }
        )
      }
    }
  }
</script>
<style>
  .all {
    height: 100%;
    opacity: 1;
  }

  ul {
    list-style: none;
  }

  .col-md-3 {
    height: 100%;
    padding-left: 0;
    position: relative;
  }

  .col-md-3 p {
    border-bottom: 1px solid #eeeeee;
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
    padding-top: 20px;
    padding-left: 15%;
    position: relative;
  }

  .col-md-3 li:hover {
    background-color: rgb(245, 245, 245);
    cursor: pointer;
  }

  .col-md-3 li span {
    display: block;
    margin-bottom: 8px;
  }

  h3 {
    margin-top: 0;
  }

  p {
    margin-bottom: 0
  }

  .col-md-3 .add {
    position: absolute;
    left: 70%;
    top: 20%;
  }

  .col-md-3 .add:hover {
    cursor: pointer;
  }

  .col-md-3 li img {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    top: 45%;
  }

  .tagShow {
    position: fixed;
    left: 10%;
    top: 93%;
  }
</style>
