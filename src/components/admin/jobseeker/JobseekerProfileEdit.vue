<template>
    <div class="user-main">
        <h3>プロフィール編集</h3>       
            <div class="col-12 tab-list sticky-top w-100">
                <ul class="list-group list-group-horizontal">   
                <li v-for="(item, index) in items" class="list-group-item" :key="index.id">                                          
                    <a  v-scroll-to="{el:'#'+(item,index),offset:-70}"
                    @click="ScrollTab(index)"                            
                    :class="{isActive: activeIndex === index ? 'active':''}"                       
                    class="list-link">{{ item.text }}</a> 
                </li>
                </ul>  
            </div>    
        <JobseekerProfile></JobseekerProfile>
    </div>
</template>
<script>
    import JobseekerProfile from "../jobseeker/JobseekerProfile";
    export default {
        components: { JobseekerProfile },
        props: ['isActive'],
        data(){
             return{               
                  items: {
                     selfIntroEdit:{text:'自己紹介'},
                     basicInfoEdit:{text:'基本情報'},
                     careerEdit:{text:'経歴'},
                     expQualificationEdit:{text:'経験・資格'},
                     desiredConditionEdit:{text:'希望条件'},                             
                 },    
                 activeIndex: null,  
            }
        },
        methods:{
        
           ScrollTab(index) {               
                if (this.activeIndex === index) {
                    this.activeIndex = null;               
                } else {
                    this.activeIndex = index;                    
                }
            }   
        }
        
    }
</script>
<style scoped>
    .isActive{
        color: #195b2e !important;
        font-weight: bold;
        border-bottom: 1px solid #195b2e;   
    }
    .tab-list {
        margin: 20px 0;
        padding: 0;
        background: #fff;
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
        border-radius: 5px;
    }
    .tab-list .list-group-item {
        padding: 20px 40px;
        border: none;
    }
    .list-link {
        color: #619873;
    }
   

</style>
