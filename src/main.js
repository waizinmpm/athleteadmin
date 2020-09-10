import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from '../src/api/apiBasePath';
import Vuelidate from 'vuelidate';
import DataTable from '../src/components/DataTable/DataTable';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import VueI18n from 'vue-i18n';
import English from '../src/lang/en';
import 日本語 from './lang/jp';
import configs from './config';
import VueFilter from 'vue-filter';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import alertService from './services/AlertService';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('DataTable', DataTable);
Vue.use(require('vue-moment'));
Vue.use(VueFilter);
Vue.use(DatePicker);
Vue.use(Vuelidate);
Vue.use(api);
Vue.use(VueSweetalert2);
Vue.prototype.$api = api;
Vue.prototype.$configs = configs;
Vue.config.productionTip = false;
Vue.prototype.$alertService = alertService;

Vue.use(Loading, {
	color: '#0062ff',
	loader: process.env.VUE_APP_LOADING_INDICATOR ?? 'dots',
	backgroundColor: '#ffffff',
	width: 30,
	height: 30,
    opacity: 0.9,
    fontSize: 12,
},{
	after: (new Vue()).$createElement('p', {class: 'loading-text'}, ['送信中'])
});
const languages = {
    en: English,
    jp: 日本語,
}

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'jp',
    messages: languages,
})

// Vue.use(Loading, {
// 	color: '#00AB00',
// 	loader: process.env.MIX_LOADING_INDICATOR ?? 'dots',
// 	backgroundColor: '#F0F0F0',
// 	width: 64,
// 	height: 64,
// 	opacity: 0.7
// },{
// 	after: (new Vue()).$createElement('h3', {class: 'loading-text'}, ['送信中'])
// });

Vue.filter('aj-number', (value) => Number(value) ? Number(value).toLocaleString('en-US',{ maximumFractionDigits: 0 }) : 0);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");