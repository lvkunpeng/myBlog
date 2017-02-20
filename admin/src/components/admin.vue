<template>
  <div>
    <div class="col-md-12">
      <div class="col-md-1">
        <ul class="height">
          <li class="logo"><img src="../assets/logo.png" alt=""></li>
          <li class="other"><img src="../assets/01.png" alt=""></li>
          <li class="other"><img src="../assets/02.png" alt=""></li>
          <li class="other"><img src="../assets/03.png" alt=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<!--<div class="col-md-8">
  二级路由
  <input type="text" class="col-md-8">
  <div class="col-md-8">
    <div>下拉菜单</div>
    <button>保存草稿</button>
    <button>发布文章</button>
  </div>
</div> -->
<script>
  export default {}
</script>
<style>
  * {
    color: rgb(53, 73, 94);
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  ul {
    list-style: none;
  }

  .logo {
    margin-top: 30px;
    width: 40px;
    height: 40px;
  }

  .logo > img {
    width: 40px;
    height: 40px;
  }

  .other {
    margin-top: 70px;

  }

  .other > img {
    width: 35px;
    height: 35px;
  }

  .col-md-1 {
    border-right: 1px solid #eeeeee;
    padding-left: 0;
    background-color: #fafafa;
    height: 100%;
  }

  .col-md-12 {
    padding-left: 0;
    height: 100%;
  }
</style>
