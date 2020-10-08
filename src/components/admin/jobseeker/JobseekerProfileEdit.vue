<template>
    <div class="user-main">
        <div class="d-flex align-items-end">
            <h3 class="mb-0">プロフィール編集</h3> 
             <router-link to="/admin-jobseeker-list" class="ml-auto">
                <span class="btn back-btn">会員情報一覧へ戻る</span>
            </router-link>
        </div>      
            <div class="col-12 tab-list sticky-top">
                <ul class="tab-list-row">   
                    <li v-for="(item, index) in items" class="list-item" :key="index.id">                                          
                        <a  v-scroll-to="{el:'#'+(item,index),offset:-130}"
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
.tab-list-row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
}
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
    border: 1px solid #f3efef;
}
.tab-list .list-item {
    padding: 20px 40px;
    list-style: none;
}
.list-link {
    color: #619873;
    cursor: pointer;
}
.sticky-top {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    width: 100%!important;
    z-index: 1020;
}
.tab-content {
    padding: 50px 20px;
    background: #fff;
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
    border-radius: 5px !important;
    border: 1px solid #f3efef;
}
.back-btn {
    border-color: #aab2bd;
    background-color: #aab2bd;
}
</style>
