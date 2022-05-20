import 'element-ui/lib/theme-chalk/index.css';
//import '@/style/style.scss'
import './style/wbk.css';
require('vue-flash-message/dist/vue-flash-message.min.css');

import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui'
//import VueFlashMessage from 'vue-flash-message';
import {store} from './store';

//Vue.use(VueFlashMessage);
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
