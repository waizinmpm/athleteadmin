import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from '../src/api/apiBasePath';
import Vuelidate from 'vuelidate';
import DataTable from '../src/components/DataTable/DataTable';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ja';
window.$ = require('jquery')
window.JQuery = require('jquery')
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
import VueScrollTo  from 'vue-scrollto';
import io from 'socket.io-client';
import VueChatScroll from 'vue-chat-scroll';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Vue2Filters from 'vue2-filters';

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('DataTable', DataTable);
Vue.use(require('vue-moment'));
Vue.component('v-select', vSelect);
Vue.use(VueFilter);
Vue.use(DatePicker);
Vue.use(Vuelidate);
Vue.use(VueScrollTo);
Vue.use(VueChatScroll);
Vue.use(api);
Vue.use(VueSweetalert2);
Vue.prototype.$api = api;
Vue.prototype.$configs = configs;
Vue.config.productionTip = false;
Vue.prototype.$alertService = alertService;

// --socket.io client init
window.io = io;
window.socket = io(process.env.VUE_APP_SOCKET_URL);

Vue.use(Loading, {
	color: '#00AB00',
	loader: process.env.VUE_APP_LOADING_INDICATOR ?? 'dots',
	backgroundColor: '#ffffff',
	width: 48,
	height: 48,
    opacity: 0.7,
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

Vue.use(VueScrollTo, {
	container: "body",
	duration: 500,
	easing: "ease",
	offset: 0,
	force: true,
	cancelable: true,
	onStart: false,
	onDone: false,
	onCancel: false,
	x: false,
	y: true
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

Vue.use(Vue2Filters);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");