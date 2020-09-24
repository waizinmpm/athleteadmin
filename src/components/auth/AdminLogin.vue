<template>
  <div class="login">
      <div
        v-if="registeredUser"
        class="text-success"
      >Thank you {{registeredUser.name}}.You can now login</div>         
        <div class="login-card-body row">
            <div class="col-12">
                <img :src="'../../images/logo_admin.png'" class="logo-img" alt="ATLETE REBORN PROJECT" />
                <form class="form-signin" role="form" @submit.prevent="authenticate">
                    <h3 class="form-signin-heading text-center">運営管理者ログイン</h3> 

                    <div class="form-group has-error has-feedback" v-if="authError">
                        <label for="inputError2" class="control-label">{{authError}}</label>           
                    </div>

                    <div class="form-group">
                    <label for="email">メール</label>
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
                    <button class="btn loginbtn mr" type="submit">ログイン</button>
                    <button class="btn cancelbtn" type="button">{{ $t('common.cancel') }}</button>
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
        })
        .catch(error => {
          this.$store.commit("loginFailed", { error });
        });
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
.logo-img {
    display: block;
    margin: 0 auto 20px; 
    padding: 10px 50px;
    background: #334e12; 
}
.btn {
    color: #fff;
    width: 140px;
    padding: 10px 0;
    border-radius: 0;
}
.loginbtn{
    background-color: #84BE3F; 
}
.cancelbtn {
    background-color: #919191; 
}
.mr {
    margin-right: 20px;
}
.mb-4{
    margin-bottom: 2rem;
}
.custom-checkbox {
    height: 18px !important;
    width: 18px !important;
    opacity: 0;
}

.custom-checkbox-label {
    padding-left: 15px;
    line-height: 20px;
    font-weight: normal;
}

.custom-checkbox-label::before {
    position: absolute;
    content: '';
    top: 0;
    left: -1.3rem;
    width: 1.6rem;
    height: 1.6rem;
    border: #84BE3F solid 2px;
    border-radius: 4px;
}

.custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    background-color: transparent;
    content: "\2714";
    color: #84BE3F;
    font-size: 17px;
    padding-left: 2px;
    border-color: #84BE3F;
}
</style>