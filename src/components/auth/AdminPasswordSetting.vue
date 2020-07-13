<template>
    <div class="row">
        <h5 class="m-b-10 main-header">パスワード変更</h5>
        <!-- Password confirmation form -->
        <form
            class="form-content"
            role="form"
            v-show="!passwordAuthenticated"
            @submit.prevent="authenticate"
        >
            <div class="form-group">
                <label for="password" class="form-label">{{ $t('admin_password_setting.enter_current_password') }}</label>
                <div class="input-group">
                    <!-- hide password-->
                    <input
                        class="form-control input_pass m-l1"
                        type="password"
                        placeholder="パスワード"
                        id="password"
                        v-model.trim="$v.formLogin.password.$model"
                        v-show="!showPass"
                        @keyup="clearSuccess"
                        :class="{'input-error': $v.formLogin.password.$error}"
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model.trim="$v.formLogin.password.$model"
                        v-show="showPass"
                        @keyup="clearSuccess"
                        :class="{'input-error': $v.formLogin.password.$error}"
                    />
                    <span class="showpwd" @click="showPass = !showPass">
                        <span v-show="!showPass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <span v-show="showPass" class="fa fa-fw fa-eye-slash"></span>
                    </span>
                    <div class="form-group has-error has-feedback" v-if="$v.formLogin.password.$error">
                        <label for="inputError2" class="control-label" v-if="!$v.formLogin.password.required">{{ $t('admin_password_setting.password_required') }}</label>
                    </div>
                </div>
            </div>
            <div class="fomr-group text-center m-t-30">
                <button class="btn loginbtn" type="submit">変更する</button>
            </div>
        </form>

        <!-- Password change form -->
        <form class="form-content" role="form" v-show="passwordAuthenticated" @submit.prevent>
            <div class="form-group">
                <label for="password" class="form-label">{{ $t('admin_password_setting.enter_new_password') }}</label>
                <div class="input-group">
                    <!-- hide password-->
                    <input
                        class="form-control input_pass m-l1"
                        type="password"
                        placeholder="パスワード"
                        v-model.trim="$v.formChangePassword.newPassword.$model"
                        v-show="!formChangePassword.showNewPass"
						:class="{'input-error': $v.formChangePassword.newPassword.$error}"
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model.trim="$v.formChangePassword.newPassword.$model"
                        v-show="formChangePassword.showNewPass"
						:class="{'input-error': $v.formChangePassword.newPassword.$error}"
                    />
                    <span class="showpwd" @click="formChangePassword.showNewPass = !formChangePassword.showNewPass">
                        <span v-show="!formChangePassword.showNewPass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <span v-show="formChangePassword.showNewPass" class="fa fa-fw fa-eye-slash"></span>
                    </span>
					<div class="form-group has-error has-feedback" v-if="$v.formChangePassword.newPassword.$error">
                        <label for="inputError2" class="control-label" v-if="!$v.formLogin.password.required">{{ $t('admin_password_setting.password_required') }}</label>
						<label for="inputError2" class="control-label" v-if="!$v.formLogin.password.minLength">{{ $t('admin_password_setting.password_minlength') }}</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="form-label">{{ $t('admin_password_setting.enter_password_again') }}</label>
                <div class="input-group">
                    <!-- hide password-->
                    <input
                        class="form-control input_pass m-l1"
                        type="password"
                        placeholder="パスワード"
                        v-model.trim="$v.formChangePassword.retypePassword.$model"
                        v-show="!formChangePassword.showRetypePass"
						:class="{'input-error': $v.formChangePassword.retypePassword.$error}"
                    />
                    <!-- show password-->
                    <input
                        class="form-control input_pass"
                        type="text"
                        placeholder="パスワード"
                        v-model.trim="$v.formChangePassword.retypePassword.$model"
                        v-show="formChangePassword.showRetypePass"
						:class="{'input-error': $v.formChangePassword.retypePassword.$error}"
                    />
                    <span class="showpwd" @click="formChangePassword.showRetypePass = !formChangePassword.showRetypePass">
                        <span v-show="!formChangePassword.showRetypePass" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <span v-show="formChangePassword.showRetypePass" class="fa fa-fw fa-eye-slash"></span>
                    </span>
					<div class="form-group has-error has-feedback" v-if="$v.formChangePassword.retypePassword.$error">
                        <label for="inputError2" class="control-label" v-if="!$v.formLogin.password.sameAsNewPassword">{{ $t('admin_password_setting.password_match') }}</label>
                    </div>
                </div>
            </div>
            <div class="fomr-group text-center m-t-30">
                <button
                    class="btn loginbtn"
                    type="submit"
                    :disabled="$v.formChangePassword.$invalid"
                    @click="changePassword"
                >OK</button>
                <button
                    class="btn loginbtn"
                    type="button"
                    @click="cancelChange"
                >{{ $t('common.cancel') }}</button>
            </div>
        </form>

        <div class>
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
import { login } from "../../partials/auth";
import api from "../../api/apiBasePath";
import { mapGetters } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
    mounted() {},
    data() {
        return {
            formLogin: {
                password: ""
            },
            formChangePassword: {
                newPassword: "",
                showNewPass: false,
                retypePassword: "",
                showRetypePass: false
            },
            showPass: false,
            passwordAuthenticated: false,
            errors: null,
            success: null
        };
    },
    validations: {
        formLogin: {
            password: {
                required,                
            }
		},
		formChangePassword: {
			newPassword: {
				required,
				minLength: minLength(8),
			},
			retypePassword: {
				sameAsNewPassword: sameAs('newPassword')
			}
		}
    },
    computed: {
        ...mapGetters(["currentUser"]),
        authError() {
            return this.$store.getters.authError;
        }
    },
    methods: {
        authenticate: function() {
			const loginForm = this.$v.formLogin;
			loginForm.$touch();			
            if (!loginForm.$invalid) {
                login({
                    email: this.currentUser.email,
                    password: this.$data.formLogin.password
                })
				.then(() => {
					this.passwordAuthenticated = true;
					this.errors = null;
				})
				.catch(() => {
					this.errors = this.$t(
						"admin_password_setting.password_wrong"
					);
				});
            }
        },
        changePassword: function() {
			const formChangePassword = this.$v.formChangePassword;
			formChangePassword.$touch();
			if (!formChangePassword.$invalid) {
				api.post("/v1/admin/password-change", {
					password: this.$data.formChangePassword.newPassword
				})
				.then(() => {
					this.success = this.$t(
						"admin_password_setting.password_changed"
					);
					this.cancelChange();
				})
				.catch(err => {
					let errObj = err.response.data.error.message;
					for (let key in errObj) {
						this.errors += errObj[key];
					}
				});
			}            
        },
        cancelChange: function() {
            this.formChangePassword.newPassword = "";
			this.formChangePassword.retypePassword = "";
			this.$v.formChangePassword.$reset();
            this.formLogin.password = "";
			this.passwordAuthenticated = false;
			this.$v.formLogin.$reset();
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
    color: #5da017;
}
.input-error {
    border: 1px solid red;
}




.form-content {
    width: 30%;
    height: 100vh;
    padding: 20px;
}
.form-control {
    border-radius: 5px !important;
}
.loginbtn{
    background-color: #84BE3F;
    color: #fff;
    width: 120px;
    padding: 8px 0;
    border-radius: 0;
    margin-right: 20px;
}
.showpwd {
    top: 7px;
}
.form-group {
    margin-bottom: 25px;
}
.form-label {
    border-left: 5px solid #84be3f;
    padding-left: 5px;
    margin-bottom: 7px;
}
.form-control:focus {
    border-color: #84BE3F;
}
</style>