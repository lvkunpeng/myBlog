<template>
  <div class="col-md-12">
    <div class="col-md-1">
      <ul class="height">
        <li class="logo"><img src="./assets/logo.png" alt=""></li>
        <router-link to="/list" >
          <li class="other" v-show="show"><img src="./assets/01.png" alt=""></li>
        </router-link>
        <router-link to="/tap">
          <li class="other" v-show="show"><img src="./assets/02.png" alt=""></li>
        </router-link>
        <router-link to="/login">
          <li class="other" v-show="!show"><img src="./assets/03.png" alt=""></li>
        </router-link>
      </ul>
    </div>
    <div class="col-md-11">
      <transition  enter-active-class="fadeIn animated" leave-active-class="fadeOut">
          <router-view>
        </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{
        show:false
      }
    },
    created(){
      this.$on('login-event',(el)=>{
        this.show = true;
        this.$router.push({'path':'/list'})
      })
    }
  }
</script>
<style>
.fadeOut{display: none}
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
    padding-right: 0;
    height: 100%;
  }

  .col-md-11 {
    height: 100%;
    padding-left: 0;
    padding-right: 0;}
  /*.fade-enter-active, .fade-leave-active {*/
    /*transition: opacity .5s*/
  /*}*/
  /*.fade-enter, .fade-leave-active {*/
    /*opacity: 0*/
  /*}*/
</style>
