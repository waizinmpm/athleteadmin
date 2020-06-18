import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from '../src/api/apiBasePath';


window.$ = require('jquery')
window.JQuery = require('jquery')
require('datatables.net');
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DatePicker from 'vue2-datepicker';

import 'vue2-datepicker/index.css';

import VueI18n from 'vue-i18n';
import English from '../src/lang/en';
import 日本語 from './lang/jp';
Vue.use(DatePicker);
Vue.use(api)
Vue.prototype.$api = api
Vue.config.productionTip = false;

const languages = {
    English: English,
    日本語: 日本語,
}

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: '日本語',
    messages: languages,
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");