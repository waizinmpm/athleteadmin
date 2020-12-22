<template>
    <div class="user-main">
        <div class="d-flex align-items-end mb-20">
            <h3 class="mb-0" v-if="$route.name == 'jobseeker-detail'">詳細情報 <span style="color:red">{{record_status == 3 ? '退会' : ''}}</span></h3> 
            <h3 class="mb-0" v-if="$route.name == 'JobseekerEdit'">プロフィール編集<span style="color:red">{{record_status == 3 ? '退会' : ''}}</span></h3> 
            <span @click="$router.go(-1)" class="ml-auto btn btn-back">一覧へ戻る</span>
            <!-- <span @click="goBack" class="ml-auto btn btn-back">一覧へ戻る</span> -->
        </div>      
            <div class="col-12 tab-list sticky-top" v-if="showMenuBar" v-on:scroll="handleScroll">
                <ul class="tab-list-row">   
                    <li v-for="(item, index) in items" class="list-item" :key="index.id">                                          
                        <a  v-scroll-to="{el:'#'+(item,index),offset:-130}"
                        @click="ScrollTab(index)"                            
                        :class="{isActive: activeIndex === index ? 'active':''}"                       
                        class="list-link">{{ item.text }}</a> 
                    </li>
                </ul>  
            </div>    
        <JobseekerProfile @menuShowHide="changeMenu" @showDeactivateInDetail="msgDeactivate"></JobseekerProfile>
    </div>
</template>
<script>
    function elementInViewport(el) {
        var top = el.offsetTop;
        var height = el.offsetHeight;
        var bottom = top + height;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
        }

        return (
            !(top < window.pageYOffset && bottom < window.pageYOffset) &&
            !(top > (window.pageYOffset + (window.innerHeight)) && bottom > window.pageYOffset + (window.innerHeight))
        );
    }

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
                 activeIndex : null, 
                 showMenuBar : true,
                 record_status : 1,
            }
        },
        created(){
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods:{
        
           ScrollTab(index) {               
                if (this.activeIndex === index) {
                    this.activeIndex = null;               
                } else {
                    this.activeIndex = index;                    
                }
            },

            handleScroll () {
                 let id = ['careerEdit','expQualificationEdit','desiredConditionEdit','selfIntroEdit','basicInfoEdit']
                 const elementsInViewArray = id.map(String => {
                 const el = document.getElementById(String);
                 if(elementInViewport(el)) {
                    return String;
                    }
                 });
                 this.activeIndex = elementsInViewArray.find(String => String)
            },

            changeMenu(load){
                this.showMenuBar = load;
            },

            msgDeactivate(status) {
                this.record_status  = status;
            },

            /* goBack() {
                let paginate = {
                    page: 'jobseeker-list',
                    page_no: this.$route.params.paging || this.$store.getters.getPaging.page_no,
                }
                this.$store.commit('setPaging',paginate);
                this.$router.go(-1);
            } */
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
.btn-back {
    border-color: #aab2bd;
    background-color: #aab2bd;
}
.mb-20 {
    margin-bottom: 20px;
}
</style>
