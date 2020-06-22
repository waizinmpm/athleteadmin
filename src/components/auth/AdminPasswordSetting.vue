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
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model="formLogin.password"
                        v-show="showPass"
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
    </div>
</template>
<script>
import { login } from '../../partials/auth';
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
            passwordAuthenticated: false
        };
	},
	computed: {
		...mapGetters([
			"currentUser"
		]),
		isPasswordMatched() {
			return this.formChangePassword.newPassword.length > 0 && 
				this.formChangePassword.newPassword == this.formChangePassword.retypePassword;
		}
	},
    methods: {
        authenticate: function() {
			login({
				email: this.currentUser.email,
				password: this.$data.formLogin.password
			})
			.then(() => {
				this.passwordAuthenticated = true;
			})
			.catch(err => {
				console.log(err);
			})            
		},
		changePassword: function() {
			console.log("Changing password...");
		},
		cancelChange: function() {
			this.formChangePassword.newPassword = "";
			this.formChangePassword.retypePassword = "";
			this.formLogin.password = "";
			this.passwordAuthenticated = false;
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
</style>