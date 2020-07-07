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

Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('DataTable', DataTable);
Vue.use(require('vue-moment'));
Vue.use(DatePicker);
Vue.use(Vuelidate);
Vue.use(api)
Vue.prototype.$api = api
Vue.config.productionTip = false;

const languages = {
    en: English,
    jp: 日本語,
}

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'jp',
    messages: languages,
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");