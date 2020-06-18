<template>
  <div class="login row justify-content-center">
    <div class="col-md-12">
      <div
        v-if="registeredUser"
        class="text-success"
      >Thank you {{registeredUser.name}}.You can now login</div>
      <div class="card">      
        <div class="login-card-body">
         <form class="form-signin" role="form" @submit.prevent="authenticate">
          <h3 class="form-signin-heading text-center">運営管理者ログイン</h3> 

          <div class="form-group has-error has-feedback" v-if="authError">
            <label for="inputError2" class="control-label">{{authError}}</label>           
          </div>

          <div class="form-group">
          <label for="email">ID</label>
            <div class="input-group">              
              <input type="email" class="form-control" name="メールアドレス" id="email" placeholder="メールアドレス" autocomplete="off" v-model="formLogin.email"/>
            </div>
          </div>

          <div class="form-group">
          <label for="password">Password</label>
            <div class="input-group">               
              <!-- hide password-->
              <input class="form-control input_pass m-l1" type="password" placeholder="パスワード" id="password" v-model="formLogin.password" v-show="!showPass" @keyup="formLogin.password" />
              <!-- show password-->
              <input class="form-control input_pass" type="text" placeholder="パスワード" v-model="formLogin.password" v-show="showPass"  @keyup="formLogin.password"/>
              <span class="showpwd" @click="showPass = !showPass">
              <span v-show="!showPass"  class="fa fa-fw fa-eye field-icon toggle-password"></span>
              <span v-show="showPass" class="fa fa-fw fa-eye-slash"></span>
              </span>
             
            </div>
          </div>

          <div class="form-group">
            <input type="checkbox" class="custom-control-input custom-checkbox" id="customCheck1">
            <label class="custom-control-label custom-checkbox-label" for="customCheck1">パスワードを記憶して⾃動ログインする
            </label>
          </div>

          <div class="fomr-group text-center m-t-30">
           <button class="btn loginbtn" type="submit">ok</button>
           <button class="btn searchbtn" type="submit">cancel</button>
           </div>
        </form>          
        </div>
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
  text-align: center;
  color: red;
}
.loginbtn{
      background-color: #004bb1;
      color: #fff;
      width: 120px;
      padding: 10px 0;
      border-radius: 20px;
      margin-right: 20px;
}
.searchbtn {
      background-color: #004bb1;
      color: #fff;
      width: 120px;
      padding: 10px 0;
      border-radius: 20px;
    }
</style>