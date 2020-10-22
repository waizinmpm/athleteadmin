<template> 
  <div class="admin-home">    
   <div class="row">
    <div class="col-sm-6 p-0 searchform-one">
        <h5 class="m-b-10 main-header">{{$t('menu.management_screen')}}</h5>  
    </div>    
   </div>
   <div class="row col-xs-12">
        <div class="col-md-3">
            <div class="dashboard-card">
                <h5>{{count.recruiter}}</h5>
                <p>企業会員</p>
                <span class="custom-icon"><i class="fa fa-user color-one" style="font-size:40px;"></i></span>
            </div>  
        </div>   
         <div class="col-md-3">
            <div class="dashboard-card">
                <h5>{{count.jobseeker}}</h5>
                <p>求職者会員</p>
                <span class="custom-icon"><i class="fa fa-files-o color-three" style="font-size:40px;"></i></span>
            </div>             
        </div> 
        <div class="col-md-3">
            <div class="dashboard-card">
                <h5>{{count.job}}</h5>
                <p>求人</p>
                <span class="custom-icon"><i class="fa fa-suitcase color-five" style="font-size:40px;"></i></span>
            </div>             
        </div>                    
    </div>
    <div class="row col-xs-12">
         <div class="col-md-3">
            <div class="dashboard-card">
                <h5>{{count.jobApply}}</h5>
                <p>求人問合わせ/応募者一覧</p>
                <span class="custom-icon"><i class="fa fa-file-text color-four" style="font-size:40px;"></i></span>
            </div>             
        </div> 
        <div class="col-md-3">
            <div class="dashboard-card">
                <h5>{{count.scout}}</h5>
                <p>内定未請求</p>
               <span class="custom-icon"><i class="fa fa-users color-two" style="font-size:40px;"></i></span>
            </div>  
        </div>   
        <div class="col-md-3">
            <div class="dashboard-card">
                <h5>{{count.payment_count}}</h5>
                <p>請求済</p>
                <span class="custom-icon"><i class="fa fa-credit-card color-six" style="font-size:40px;"></i></span>
            </div>             
        </div>     
    </div>
    
  </div>
</template>
<script>
    export default {
        data(){
            return {
                count:[],
            }
        },
        created(){
            this.getCount();
        },
        methods:{
            getCount(){
                this.$api.get('/v1/admin/dashboard-count').then(res => {
                    this.count = res.data
                    console.log(this.count)
                })
            },
        }
    }
</script>
<style>
.admin-home {
    height: 100vh;
}
.dashboard-card{
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;        
    border:1px solid #eee;
    box-shadow: 0 1px 2px rgb(189, 203, 228);
    padding: 30px;
    margin: 0px 10px 30px 10px;
}
.dashboard-card h5{
    font-size: 30px;
    color: #000;
    font-weight: bold;
}
.dashboard-card p{
    font-size: 16px;
    color: #6a7482;
}
.color-one{
    color:#ACA0F3;
}
.color-two{
    color: #F58BD9;
}
.color-three{
    color:#FB7575;
}
.color-four{
    color:#85C49A;
}
.color-five{
    color:#D1CA04;
}
.color-six{
    color:#F8A220;
}
.custom-icon{
    position: absolute;
    top: 60px;
    right: 80px;
}
</style>