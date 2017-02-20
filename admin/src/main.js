/**
 * Created by 吕堃鹏 on 2017/2/13 0013.
 */
import '../src/assets/css/bootstrap.css'
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from '../src/App.vue';
import list from '../src/components/list.vue';
import tap from '../src/components/tap.vue';
import login from '../src/components/login.vue';
import edit from '../src/components/edit.vue';
import change from '../src/components/change.vue';
import read from  '../src/components/read.vue';
Vue.use(VueRouter);
Vue.use(VueResource);
import  'animate.css';
const router = new VueRouter({
  routes: [
    {path: '/', component: login},
    {path: '/list', component: list,children:[
      {path:'/edit',component: edit},
      {path:'/change',component: change},
      {path:'/read:id',component:read}
    ]},
    {path: '/tap', component: tap},
    {path: '/login', component: login},
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
