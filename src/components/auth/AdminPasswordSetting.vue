<template>
    <div class="row">
        <!-- Password confirmation form -->
        <form class="form-signin" role="form" v-show="!passwordAuthenticated" @submit.prevent="authenticate">
            <div class="form-group">
                <label for="password">{{ $t('adminPasswordSetting.enter_current_password') }}</label>
                <div class="input-group">
                    <!-- hide password-->
                    <input 
                        class="form-control input_pass m-l1"
                        type="password"
                        placeholder="パスワード"
                        id="password"
                        v-model="formLogin.password"
                        v-show="!showPass"
						@keyup="clearSuccess"
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model="formLogin.password"
                        v-show="showPass"
						@keyup="clearSuccess"
                    />
                    <span class="showpwd" @click="showPass = !showPass">
                        <span v-show="!showPass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <span v-show="showPass" class="fa fa-fw fa-eye-slash"></span>
                    </span>
                </div>
            </div>
            <div class="fomr-group text-center m-t-30">
                <button class="btn loginbtn" type="submit" :disabled="formLogin.password.length <= 0">OK</button>
            </div>
        </form>

        <!-- Password change form -->
        <form class="form-signin" role="form" v-show="passwordAuthenticated" @submit.prevent="">
            <div class="form-group">
                <label for="password">{{ $t('adminPasswordSetting.enter_new_password') }}</label>
                <div class="input-group">
                    <!-- hide password-->
                    <input 
                        class="form-control input_pass m-l1"
                        type="password"
                        placeholder="パスワード"
                        v-model="formChangePassword.newPassword"
                        v-show="!formChangePassword.showNewPass"
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model="formChangePassword.newPassword"
                        v-show="formChangePassword.showNewPass"
                    />
                    <span class="showpwd" @click="formChangePassword.showNewPass = !formChangePassword.showNewPass">
                        <span v-show="!formChangePassword.showNewPass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <span v-show="formChangePassword.showNewPass" class="fa fa-fw fa-eye-slash"></span>
                    </span>
                </div>
            </div>
            <div class="form-group">
                <label for="password">{{ $t('adminPasswordSetting.enter_password_again') }}</label>
                <div class="input-group">
                    <!-- hide password-->
                    <input
                        class="form-control input_pass m-l1"
                        type="password"
                        placeholder="パスワード"
                        v-model="formChangePassword.retypePassword"
                        v-show="!formChangePassword.showRetypePass"
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model="formChangePassword.retypePassword"
                        v-show="formChangePassword.showRetypePass"
                    />
                    <span class="showpwd" @click="formChangePassword.showRetypePass = !formChangePassword.showRetypePass">
                        <span v-show="!formChangePassword.showRetypePass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <span v-show="formChangePassword.showRetypePass" class="fa fa-fw fa-eye-slash"></span>
                    </span>
                </div>
            </div>
            <div class="fomr-group text-center m-t-30">
                <button class="btn loginbtn" type="submit" :disabled="!isPasswordMatched" @click="changePassword">OK</button>
                <button class="btn searchbtn" type="button" @click="cancelChange">{{ $t('common.cancel') }}</button>
            </div>			
        </form>

		<div class="">
			<div class="form-group has-error has-feedback" v-if="errors">
				<label for="inputError2" class="control-label">{{ errors }}</label>
			</div>
			<div class="form-group has-success has-feedback" v-if="success">
				<label for="inputError2" class="control-label">{{ success }}</label>
			</div>
		</div>
		
    </div>
</template>
<script>
import { login } from '../../partials/auth';
import api from '../../api/apiBasePath';
import { mapGetters } from 'vuex';

export default {
	mounted() {		
		
	},	
    data() {
        return {
            formLogin: {				
                password: ""
            },
            formChangePassword: {
				newPassword: "",
				showNewPass: false,
				retypePassword: "",
				showRetypePass: false,
			},			
            showPass: false,
			passwordAuthenticated: false,
			errors: null,
			success: null
        };
	},
	computed: {
		...mapGetters([
			"currentUser"
		]),
		isPasswordMatched() {
			return this.formChangePassword.newPassword.length > 0 && 
				this.formChangePassword.newPassword == this.formChangePassword.retypePassword;
		},
		authError() { 
			return this.$store.getters.authError;
		},
	},
    methods: {
        authenticate: function() {			
			login({
				email: this.currentUser.email,
				password: this.$data.formLogin.password
			})
			.then(() => {				
				this.passwordAuthenticated = true;
				this.errors = null;
			})
			.catch(() => {
				this.errors = this.$t('adminPasswordSetting.password_wrong');
			})
		},
		changePassword: function() {
			api.post('/v1/admin/password-change', {
				password: this.$data.formChangePassword.newPassword
			})
			.then(() => {
				this.success = this.$t('adminPasswordSetting.password_changed');
				this.cancelChange();
			})
			.catch(err => {				
				let errObj = err.response.data.error.message;
				for (let key in errObj) {					
					this.errors += errObj[key];
				}
			});
			
		},
		cancelChange: function() {
			this.formChangePassword.newPassword = "";
			this.formChangePassword.retypePassword = "";
			this.formLogin.password = "";
			this.passwordAuthenticated = false;
			this.errors = null;
		},
		clearSuccess: function() {
			this.success = null;
		}
    }
};
</script>
<style scoped>
.loginbtn {
    background-color: #004bb1;
    color: #fff;
    width: 120px;
    padding: 10px 0;
    border-radius: 20px;
    margin-right: 20px;
}
.has-success .control-label {
	color: #5DA017;
}
</style>