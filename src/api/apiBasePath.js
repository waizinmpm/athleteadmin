import axios from 'axios';
import store from '../store';
import router from '../router';
import alertService from '../services/AlertService';
let errorShowing = false;
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL, 
    // headers: {'Authorization': `Bearer ${store.getters.token}`}
});
console.log('stre', store)
api.interceptors.request.use(function(config) {
    if (store.getters.token) {
        config.headers.common = { 'Authorization': `Bearer ${store.getters.token}` }
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
	return response;
}, function (error) {
    // response error
    console.log('api response.status', error.response.status);
	if (400 === error.response.status) 
	{	
		if (!errorShowing) {
            errorShowing = true;
            // let redirect = '/';
            // localStorage.removeItem('adminuser');
            // window.location = redirect;
            store.commit('logout');
            router.push({ path: "/" });
			alertService.showInfoDialog(null,'長時間操作がなかったため、ログアウトしました。')
		}
		
	}
	return Promise.reject(error);
})

export default api;