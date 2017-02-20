/**
 * Created by 吕堃鹏 on 2017/2/13 0013.
 */
import Vue from 'vue';
import '../src/assets/css/bootstrap.css'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from '../src/App.vue';
import home from '../src/components/home.vue';
import about from '../src/components/about.vue';
import archive from '../src/components/archive.vue';
import details from '../src/components/details.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes: [
    {path: '/', component: home},
    {path: '/home', component: home},
    {path: '/about', component: about},
    {path: '/archive', component: archive},
    {path: '/details:id', component: details},
  ]
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
