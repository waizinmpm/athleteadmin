import axios from 'axios';
import store from '../store';
import router from '../router';
import alertService from '../services/AlertService';
// let errorShowing = false;
let canUpdateToken = true;
const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL, 
    // headers: {'Authorization': `Bearer ${store.getters.token}`}
});
console.log('stre', store)
api.interceptors.request.use(function(config) {
    if (store.getters.token) {
        config.headers.common = { 'Authorization': `Bearer ${store.getters.token}` }
		console.log('injected token', (store.getters.token.split('.'))[2]);
		const payload = parseJwt(store.getters.token);
		const milliseconds = payload.exp * 1000
		const dateObject = new Date(milliseconds)
		console.log('REQUEST token will expire at:', dateObject.toLocaleString());
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    if (response.headers['authorization'] && canUpdateToken) {
		canUpdateToken = false;
        let newToken = response.headers['authorization'].replace('Bearer ','');
        const payload = parseJwt(newToken);
		const milliseconds = payload.exp * 1000
		const dateObject = new Date(milliseconds)
		console.log('RESPONSE token will expire at:', dateObject.toLocaleString());
		// update token in localStorage
		store.dispatch('refreshToken', { token: newToken }).then(() => {
			console.log('new token', (newToken.split('.'))[2]);
			// 10 second interval for next refresh
			canUpdateToken = true;
			// setTimeout(() => { canUpdateToken = true }, 1000 * 10);
		});
	}
	return response;
}, function (error) {
    // response error
    console.log('api response.status', error.response.status);
	if (400 === error.response.status) 
	{
		// if (!errorShowing) {
        //     errorShowing = true;
            // let redirect = '/';
            // localStorage.removeItem('adminuser');
            // window.location = redirect;
        store.commit('logout');
        router.push({ path: "/" });
        alertService.showInfoDialog(null,'長時間操作がなかったため、ログアウトしました。')
		// }
		
	}
	return Promise.reject(error);
})

export default api;