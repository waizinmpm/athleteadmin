import axios from 'axios';
import store from '../store';
import router from '../router';
// import AlertService from '../services/AlertService';
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
		if (router.currentRoute.path.includes('login')|| router.currentRoute.path.includes('password-setting') || router.currentRoute.path.includes('setting')) {
			return Promise.reject(error);
		}
		if (!errorShowing) {
			errorShowing = true;
			// AlertService.showErrorDialog(null, "Your login is invalid").then(() => {
            let redirect = '/';
            localStorage.removeItem('adminuser');
            window.location = redirect;
			// });
		}
		
	}
	return Promise.reject(error);
})

export default api;