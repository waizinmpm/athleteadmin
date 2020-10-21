<template>
  <div class="login">
      <div
        v-if="registeredUser"
        class="text-success"
      >Thank you {{registeredUser.name}}.You can now login</div>         
        <div class="login-card-body row">
            <div class="col-12 form-wrap">
                <p class="logo-txt"><span >A</span>THLETE <span  class="ml-1">R</span>EBORN <span  class="ml-1">P</span>PROJECT</p>
                <form class="form-signin" role="form" @submit.prevent="authenticate">
                    <h3 class="form-signin-heading text-center">運営管理者ログイン</h3> 

                    <div class="form-group has-error has-feedback" v-if="authError">
                        <label for="inputError2" class="control-label">{{authError}}</label>           
                    </div>

                    <div class="form-group">
                    <label for="email">メールアドレス</label>
                        <div class="input-group">              
                        <input type="email" class="form-control" name="メールアドレス" id="email" placeholder="メールアドレス" autocomplete="off" v-model="formLogin.email"/>
                        </div>
                    </div>

                    <div class="form-group">
                    <label for="password">{{ $t('common.password') }}</label>
                        <div class="input-group">               
                        <!-- hide password-->
                        <input class="form-control input_pass m-l1" type="password" placeholder="パスワード" id="password" v-model="formLogin.password" v-show="!showPass"  />
                        <!-- show password-->
                        <input class="form-control input_pass" type="text" placeholder="パスワード" v-model="formLogin.password" v-show="showPass" />
                        <p  v-if="formLogin.password != ''">
                            <span class="showpwd" @click="showPass = !showPass">
                            <span v-show="!showPass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
                            <span v-show="showPass" class="fa fa-fw fa-eye-slash"></span>
                            </span>
                        </p>
                        </div>
                    </div>

                    <!-- <div class="form-group">
                        <input type="checkbox" class="custom-control-input custom-checkbox" id="customCheck1">
                        <label class="custom-control-label custom-checkbox-label" for="customCheck1">パスワードを記憶して⾃動ログインする
                        </label>
                    </div> -->

                    <div class="fomr-group text-center m-t-30">
                        <button class="btn loginbtn bg-primary" type="submit">ログイン</button>
                    </div>
                </form>    
            </div>      
        </div>
  </div>
</template>

<script>
import { login } from "../../partials/auth";
export default {
  data() {
    return {     
      formLogin: {
        email: "",
        password: ""
      },
      error: null,  
       showPass: false,    
    };
  },
  methods: {
    authenticate() {
      this.$store.dispatch("login");
      login(this.$data.formLogin)
        .then(res => {
          console.log("res login",res);
          this.$store.commit("loginSuccess", res);          
          this.$router.push({ path: "/admin" });
        }, error => {
			let message = error.response.data.msg;
          this.$store.commit("loginFailed", { error: message });
        })
        .catch();
    }
  },
  computed: {
    
    authError() { 
		
      return this.$store.getters.authError;
    },
    registeredUser() {
      return this.$store.getters.registeredUser;
    }
  },
  
    
};
</script>

<style scoped>
.error {
    color: red;
}
.logo-txt {
    display: block;
    margin: 0 auto 30px auto;
    font-size: 21px;
    color: #fff;
    text-align: center;
    font-weight: bold;
    padding: 18px 0;
    background: #2E2E2E;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
}
.logo-txt span {
    color: #72aa30;
}
.loginbtn{
    color: #fff;
    width: 140px;
    padding: 10px 0;
    border-radius: 0;
}
</style>