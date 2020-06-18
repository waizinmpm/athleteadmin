<template>
    <div> 
     <!--sidebar-->  
    <ul class="list-group panel">
        <li class="list-group-item"><i class="glyphicon glyphicon-align-justify"></i> <b>管理画面</b></li>       
        <li>
            <a href="#demo1" class="list-group-item " data-toggle="collapse">
            <span class="glyphicon glyphicon-chevron-down" data-toggle="childcollapse1"></span>企業会員</a>
            <ul>
                <li class="collapse in" id="demo1">
                <router-link to="/recuriter-list" class="list-group-item list-group-child-item">
                    <span class="fa fa-file-text-o"></span>会員情報⼀覧
                </router-link>
                <router-link to="/job-list" class="list-group-item list-group-child-item">
                    <i class="fa fa-suitcase"></i>求⼈⼀覧
                    </router-link>
                <router-link to="/jobapply-list" class="list-group-item list-group-child-item">
                 <span class="fa fa-users"></span>求⼈応募者⼀覧
                </router-link>
                <router-link to="/scouted-list" class="list-group-item list-group-child-item">
                    <span class="fa fa-cog"></span>スカウト済み⼀覧
                </router-link>
                <router-link to="/payment-management" class="list-group-item list-group-child-item">
                    <span class="fa fa-file"></span>⼿数料⼊⾦管理
                </router-link>               
            </li>
            </ul>
        </li>
        <li>     
            <a href="#demo2" class="list-group-item " data-toggle="collapse2"><span class="glyphicon glyphicon-chevron-down" data-toggle="childcollapse2"></span>求職者会員</a>
            <ul>
                <li class="collapse in" id="demo2">
                <router-link to="/job-seeker-list" class="list-group-item list-group-child-item"><i class="glyphicon glyphicon-th-list"></i>会員情報⼀覧</router-link>                         
            </li>
            </ul>
        </li>
        <li class="list-group-item"><router-link to="/password-setting" class="" >パスワード変更</router-link></li>
        <li class="list-group-item"><router-link to="/" class="" @click.prevent="logout">{{$t('menu.logout')}}</router-link></li> 
        </ul>         
    <!--end sidebar-->
    </div>
</template>
<script>

export default {
    name: 'app-header',
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