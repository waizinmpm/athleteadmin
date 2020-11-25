<template>
    <div class="recruiter-profile-detail row">
         <h5 class="main-header">企業プロフィール詳細 <span style="color:red;">{{ recruiter_info.record_status == 3 ? '退会' : '' }}</span></h5> 
        <dl class="detail-list">
            <dt class="detail-head">企業会員番号</dt>
            <dd class="detail-data">{{ recruiter_info.recruiter_number }}</dd>
            <dt class="detail-head">企業名</dt>
            <dd class="detail-data">{{ recruiter_info.recruiter_name }}</dd>
            <dt class="detail-head">設立年月</dt>
            <dd class="detail-data">{{ recruiter_info.establishment_date }}</dd>
            <dt class="detail-head">代表者名</dt>
            <dd class="detail-data">{{ recruiter_info.representative_name }}</dd>
            <dt class="detail-head">従業員数</dt>
            <dd class="detail-data">{{ recruiter_info.num_of_employees }}</dd>
            <dt class="detail-head">事業内容</dt>
            <dd class="detail-data">{{ recruiter_info.business_description }}</dd>
            <dt class="detail-head">所在地</dt>
            <dd class="detail-data">{{ recruiter_info.address }}</dd>
            <dt class="detail-head">電話番号 1</dt>
            <dd class="detail-data">{{ recruiter_info.phone1 }}</dd>
            <dt class="detail-head">電話番号 2</dt>
            <dd class="detail-data">{{ recruiter_info.phone2 }}</dd>
            <dt class="detail-head">ご担当者様メールアドレス</dt>
            <dd class="detail-data">{{ recruiter_info.email }}</dd>
            <dt class="detail-head">WEB サイト URL</dt>
            <dd class="detail-data">{{ recruiter_info.website }}</dd>
            <dt class="detail-head">ご担当者名</dt>
            <dd class="detail-data">{{ recruiter_info.incharge_name }}</dd>
            <dt class="detail-head">担当者名(フリガナ)</dt>
            <dd class="detail-data">{{ recruiter_info.incharge_name_furigana }}</dd>
            <dt class="detail-head">秘密の質問</dt>
            <dd class="detail-data">{{ recruiter_info.question }}</dd>
            <dt class="detail-head">秘密の質問の答え</dt>
            <dd class="detail-data">{{ recruiter_info.answer }}</dd>
            <dt class="detail-head">会社ロゴ</dt>
            <dd class="detail-data">
                <img :src="recruiter_info.logo_url" class="img-contain" alt="Recruiter Logo" />
            </dd>
            <dt class="detail-head">担当者顔写真（スカウトした人材のみ閲覧可）</dt>
            <dd class="detail-data">
                <img :src="recruiter_info.incharge_photo_url" class="img-contain" />
            </dd>
            <dt class="detail-head">関連画像</dt>
            <dd class="detail-data">
                <div class="row m-0" v-if="recruiter_info.related_images">
                    <div v-for="(image,index) in recruiter_info.related_images" :key="image.id" class="col-md-6 pl-0 mb-3 related-block" >
                        <img v-if="hasRelatedImage(index) " :src="image.file_url" class="img-fluid img-contain" :alt="'Recruiter related image'+(index+1)" />
                    </div>                
                    <div class="col-md-6 mb-3 pl-0 related-block" v-for="n in 4 - recruiter_info.related_images.length" :key="n.id">
                        <img :src="defaultImageUrl" class="img-contain" alt="Recruiter related image 4" />
                    </div>
                </div>
            </dd>
            <dt class="detail-head">関連画像</dt>
            <dd class="detail-data">
                <div v-if="!recruiter_info.video" class="movie-col">
                    <p class="no-video movie-link"><img src="/images/youtube.png" alt="動画なし" class="img-fluid"></p>
                </div>
                <div v-else class="movie-col">
                    <iframe class="movie-link" :src="recruiter_info.video_url" frameBorder="0"></iframe>
                </div>
                
            </dd>
        </dl>
        <dt class="row">
            <label>会社PR等</label>
            <div class="about-row">
                <pre>
                    {{recruiter_info.company_pr}}
                </pre>
            </div>
        </dt>
        <span @click="$router.go(-1)" class="btn btn-back float-right">一覧へ戻る</span> 
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
        hasRelatedImage(index) {
            return this.recruiter_info.related_images && this.recruiter_info.related_images[index];
        },
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
    margin: 30px 0;
}
</style>