import axios from 'axios';
import store from '../store';
const api = axios.create({
    baseURL: 'http://192.168.10.106:8000/api/',
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

export default api;