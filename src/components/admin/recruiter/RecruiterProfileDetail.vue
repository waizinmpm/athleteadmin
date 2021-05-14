<template>
    <div class="recruiter-profile-detail row">
         <h5 class="main-header">企業プロフィール詳細 <span style="color:red;">{{ recruiter_info.record_status == 3 ? '退会' : '' }}</span></h5> 
        <dl class="detail-list border-bottom">
            <dt class="detail-head detail-group-topline">企業会員番号</dt>
            <dd class="detail-data detail-group-topline">{{ recruiter_info.recruiter_number || '未入力' }}</dd>
            <dt class="detail-head">企業名</dt>
            <dd class="detail-data">{{ recruiter_info.recruiter_name || '未入力' }}</dd>
            <dt class="detail-head detail-group-topline">設立年月</dt>
            <dd class="detail-data detail-group-topline">{{ recruiter_info.establishment_date || '未入力' }}</dd>
            <dt class="detail-head">代表者名</dt>
            <dd class="detail-data">{{ recruiter_info.representative_name || '未入力' }}</dd>
            <dt class="detail-head">従業員数</dt>
            <dd class="detail-data">{{ recruiter_info.num_of_employees ? recruiter_info.num_of_employees + '人' : '未入力' }}</dd>
            <dt class="detail-head">事業内容</dt>
            <dd class="detail-data">{{ recruiter_info.business_description || '未入力' }}</dd>
            <dt class="detail-head">所在地</dt>
            <dd class="detail-data">{{ recruiter_info.address || '未入力' }}</dd>
            <dt class="detail-head">電話番号 1</dt>
            <dd class="detail-data">{{ recruiter_info.phone1 || '未入力' }}</dd>
            <dt class="detail-head">電話番号 2</dt>
            <dd class="detail-data">{{ recruiter_info.phone2 || '未入力' }}</dd>
            <dt class="detail-head">ご担当者様メールアドレス</dt>
            <dd class="detail-data">{{ recruiter_info.email || '未入力' }}</dd>
            <dt class="detail-head">WEB サイト URL</dt>
            <dd class="detail-data">{{ recruiter_info.website || '未入力' }}</dd>
            <dt class="detail-head detail-group-topline">スポンサーを希望するアスリートからのメッセージ</dt>
            <dd class="detail-data detail-group-topline">{{ recruiter_info.is_sponsor == 1 ? '受ける' : '受けない' }}</dd>
            <dt class="detail-head detail-group-topline">ご担当者名</dt>
            <dd class="detail-data detail-group-topline">{{ recruiter_info.incharge_name || '未入力' }}</dd>
            <dt class="detail-head">担当者名(フリガナ)</dt>
            <dd class="detail-data">{{ recruiter_info.incharge_name_furigana || '未入力' }}</dd>
            <dt class="detail-head">秘密の質問</dt>
            <dd class="detail-data">{{ recruiter_info.question || '未入力' }}</dd>
            <dt class="detail-head">秘密の質問の答え</dt>
            <dd class="detail-data">{{ recruiter_info.answer || '未入力' }}</dd>     
        </dl>
        <div class="row m-t-30 mb-4">
            <div class="col-md-6">
                <h6 class="text-label-color">会社ロゴ</h6>
                <div class="img-block">
                    <img :src="recruiter_info.logo_url" class="img-contain" alt="会社ロゴ" />
                </div>
            </div>
            <div class="col-md-6">
                <h6 class="text-label-color">担当者顔写真（スカウトした人材のみ閲覧可）</h6>
                <div class="profile-box-l">
                     <img :src="recruiter_info.incharge_photo_url" class="img-contain" />
                </div>
            </div>
        </div>
        <div class="row  mb-1">
            <div class="col-md-6">
                <h6 class="text-label-color">関連画像</h6>
                <div class="row m-0" v-if="recruiter_info.related_images">
                    <div v-for="(image,index) in recruiter_info.related_images" :key="image.id" class="col-md-6 pl-0 mb-3 related-block" @click="imagePopup(image.file_url)">
                        <img v-if="hasRelatedImage(index) " :src="image.file_url" class="img-contain cursor-pointer" :alt="'Recruiter related image'+(index+1)" />
                    </div>                
                    <div class="col-md-6 mb-3 pl-0 related-block" v-for="n in 4 - recruiter_info.related_images.length" :key="n.id">
                        <img :src="defaultImageUrl" class="img-contain" alt="Recruiter related image 4" />
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div class="img-modal-wrapper" v-if="showModal">
                    <div class="img-modal-block">
                        <div class="img-modal-container">
                            <button class="cross-btn" @click="showModal = false">
                                <span class="icon icon-times"></span>
                                閉じる
                            </button>
                            <img  :src="this.imgUrl" class="img-popup"/>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="col-md-6">
                <h6 class="text-label-color">関連動画</h6>
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="!recruiter_info.video" class="movie-col">
                            <p class="no-video movie-link"><img src="/images/youtube.png" alt="動画なし" class="img-fluid"></p>
                        </div>
                        <div v-else class="movie-col">
                            <iframe class="movie-link" :src="recruiter_info.video_url" frameBorder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-0"> 
            <h6 class="col-md-12 mb-1">会社PR等</h6>
        </div>
        <div class="row about-row">
            <div class="col-md-12 p-0">                           
                <pre>{{recruiter_info.company_pr}}</pre>
            </div>
        </div>
        <span @click="$router.go(-1)" class="btn btn-back float-right">一覧へ戻る</span> 
        <!-- <span @click="goBack" class="btn btn-back float-right">一覧へ戻る</span> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            recruiter_info : {
                related_images : ''
            },
            defaultImageUrl:'',
            showModal : false,
            imgUrl: '',
            
        }
    },

    created() {
        let loading = this.$loading.show();
        this.$api.get('/v1/default-image')
        .then(r => { this.defaultImageUrl = r.data.data; });

        this.$api.get("/v1/recruiter/recruiters/" + `${this.$route.params.id}` + "/edit").then(r => {
            console.log("recruiter_info",r.data);
            this.recruiter_info = r.data.data;
            loading.hide()
        })
        .catch((e) => {     
            console.log("errors",e);
        })
        .finally(() => loading.hide());
    },

    methods : {
        /* goBack() {
            // let paginate = {
            //     page: this.$store.getters.getPaging.page,
            //     page_no: this.$store.getters.getPaging.page_no,
            // }
            // this.$store.commit('setPaging',paginate);
            this.$router.go(-1);
        }, */

        hasRelatedImage(index) {
            return this.recruiter_info.related_images && this.recruiter_info.related_images[index];
        },
        imagePopup(url) {
            this.showModal =  true;
            this.imgUrl = url;
            console.log(this.showModal);
        }
    },
}
</script>

<style scoped>
.recruiter-profile-detail {
    min-height: 650px;
}
.detail-list {
    padding: 10px 0 20px 0;
    overflow: hidden;
}
.detail-head,
.detail-data {
  padding: 10px 0 15px 0;
  border-top: 1px solid #ddd;
  line-height: 1.7;
}
.detail-head {
  display: flex;
  float: left;
  width: 40%;
  margin-right: 3%;
  align-items: flex-start;
  font-weight: normal;
}
.detail-data {
  float: left;
  width: 57%;
  background-color: #fff;
  min-height: 50px;
}
img {
    width: 160px;
    height: 160px;
}
.about-row {
    line-height: 2;
    border: 1px solid #ddd;
    margin: 0 0 30px 0;
}
.about-row pre {
    min-height: 200px;
    height: 200px;
    padding: 20px;
}
.border-bottom {
    border-bottom: 1px solid #dee2e6!important;
}
.img-block {
    width: 200px;
    height: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}
.img-contain {
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    -o-object-position: center;
    object-position: center;
}
.profile-box-l {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 240px;
    padding: 10px;
    border: 1px solid #ddd;
}
.related-block{
    display: flex;
    align-items: center;
    max-width: 47%;
    height: 155px;  
    margin: 0 3% 3% 0;
    padding: 10px;
    border: 1px solid #dee2e6;
}
/* img-modal-wrapper */
.img-modal-wrapper {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    z-index: 10001;
}
.img-modal-wrapper .img-modal-block {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 950px;
    height: 80vh;
    transition: all 0.3s ease;
    text-align: center;
}
.img-modal-wrapper .img-modal-container {
    height: 100%;
}
.img-modal-wrapper .cross-btn {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 16px;
    background: #999;
    padding: 4px 10px;
    border-radius: 50px;
    color:#fff;
    border: 1px solid;
}
.img-modal-wrapper .icon-times:before {
    color: #fff;
}
.img-modal-wrapper .cross-btn span {
    font-size: 13px;
}
.img-cursor {
    cursor: pointer;
}
.img-popup {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/* img-modal-wrapper */
.text-label-color {
    color: #666;
}
.movie-col {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}
.movie-link {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
}
.no-video {
    display: flex;
    background: #f0f0f0;
    justify-content: center;
    align-items: center;
}
.cursor-pointer {
    cursor: pointer;
}
.detail-group-topline {
    border-top: 1.5px solid #92c753 !important;
}
</style>