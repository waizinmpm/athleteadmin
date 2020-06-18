<template>
  <div>
    <!--nav-->
    <nav role="navigation" class="navbar navbar-custom">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button data-target="#bs-content-row-navbar-collapse-5" data-toggle="collapse" class="navbar-toggle" type="button">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a href="#" class="navbar-brand">{{$t('menu.logoheader')}}
             <span>{{$t('menu.logotxt')}}</span>
             </a>           
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div id="bs-content-row-navbar-collapse-5" class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li class="form-group" style="margin-top:15px;margin-right:15px;margin-left:15px;">
                <select v-model="$i18n.locale" class="form-control input-sm">
                  <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" style="width:80px;height:80px;border-color:#aab2bd;border-radius:3px;">{{ lang }}</option>
                </select>                 
              </li>
              <li class="active" style="min-width:90px;"><a>{{$t('menu.Home')}}</a></li>              
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    <!--nav-->  
  </div> 
</template>

<script>
export default {
    name: 'app-header',
    data(){
      return{
        langs:['日本語','English']
        
      }
    },
    methods:{
        logout(){
            this.$store.commit('logout');
            this.$router.push('/');
        }
    },
    
    computed:{
        currentUser(){
            return this.$store.getters.currentUser
        }
    }
}
</script>
<style scoped>
select {  
  padding:5px;
  font-size: 14px;
  border: 1px solid #CCC;
  height: 34px;
}
select::-ms-expand {
    display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
}
</style>






