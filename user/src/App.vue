<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid topBar ">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="col-md-3 col-md-offset-3">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand name" href="#">Kun Peng</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse topAll" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right col-md-4 col-md-offset-3 topGroup">
            <router-link to="/home">
              <li class="active">文章</li>
            </router-link>
            <router-link to="/archive">
              <li>标签</li>
            </router-link>
            <router-link to="/about">
              <li>关于我</li>
            </router-link>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <div class="content-panel col-md-8 col-md-offset-2">
      <router-view></router-view>
    </div>
    <div class="bottomBar col-md-8 col-md-offset-2"></div>
  </div>
</template>
<script>
  import marked from 'marked';
  import highlight from 'highlight.js'
  export default {
    name: 'app'
  }
</script>


<style>
  body {
    background-color: rgb(255, 255, 255);
    font-family: Source Sans Pro,Helvetica Neue,Arial,sans-serif;
  }

  .topBar {
    height: 90px;
    background-color: rgb(255, 255, 255);
    padding-top: 18px;
  }

  .topGroup li {
    font-weight: bold;
    color: rgb(53, 73, 94);
  }

  .bottomBar {
    height: 2px;
    background-color: rgb(221, 221, 221);
  }

  .navbar-default {
    box-shadow: 0 0 4px rgba(0, 0, 0, .25);
  }
  .name{
    color: rgb(53,73,94);
    font-size: 26px;
  }
</style>




