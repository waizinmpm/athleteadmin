import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import adminPage from '../components/admin/AdminLayout';
import admin from './admin';
import Register from '../components/auth/AdminRegister.vue';
import Login from '../components/auth/AdminLogin.vue';
import Unauthorized from '../components/UnauthorizedPage.vue';
import NotFoundPage from '../components/NotFoundPage';

Vue.use(VueRouter);

const routes = [

    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/Unauthorized',
        name: 'Unauthorized',
        component: Unauthorized,
    },
    {
        path: '/admin',
        component: adminPage,
        children: admin,

	},
	{
		path: '*',
		component: NotFoundPage
	}

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {

	if (to.matched.some(x => x.name == 'login')) {
		const authUser = store.getters.currentUser;
		if (authUser && authUser.role_id === 1) {
			next({ path : '/admin' });
		} else {
			next();
		}			
	} else {
		next();
	}

	if (to.meta.reqiuresAuth) {
		const authUser = store.getters.currentUser
		if (!authUser || !authUser.token) {
			next({ name: 'login' })
		} else if (authUser || authUser.token) {			
			// for admin 
			if (to.meta.admin) {
				const authUser = store.getters.currentUser
				if (authUser.role_id === 1) {
					next()
				} else {
					next({ name: 'Unauthorized' })
				}
			}
			next()
		}
	} else {
		next()
	}
})
    // important script for component permission

export default router;