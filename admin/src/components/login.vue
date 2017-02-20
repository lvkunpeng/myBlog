<template>
  <div>
    <div class="col-md-11 login">
      <h2 class="col-md-offset-5">系统登录</h2>
      <div class="form-horizontal col-md-5 col-md-offset-3">
        <div class="form-group">
          <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" v-model="user.username">
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password" v-model="user.password">
          </div>
        </div>
        <div class="form-group">
          <!--<div class="col-sm-offset-2 col-sm-10">-->
            <!--<div class="checkbox">-->
              <!--<label>-->
                <!--<input type="checkbox"> 记住用户名-->
              <!--</label>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button @click="submit" class="btn btn-success">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
       user:{
         username:'',
         password:''
       }
      }
    },
    methods: {
      submit: function () {
        var formData = JSON.stringify(this.user);
        this.$http.post('http://localhost:9090/api/login', formData).then((response) => {
          if(response.body.status == 0){
            this.$parent.$emit('login-event','el');
          }
        }, (response) => {
          if(response.body.status == 1){
            console.log('用户名或者密码错误')
          }
        });
      }
    }
  }

</script>
<style>
  .login {
    margin-top: 15%;
  }

  * {
    color: rgb(53, 73, 94);
  }

  .form-control {
    display: block;
  }
</style>
