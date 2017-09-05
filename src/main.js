// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Router from 'vue-router';
import Resource from 'vue-resource';
import Vue from 'vue';
import App from './App';
import routers from './router';

Vue.use(Router);
Vue.use(Resource);
Vue.config.productionTip = false;

const router = new Router({
  routes: routers
});
router.push('/goods');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});
