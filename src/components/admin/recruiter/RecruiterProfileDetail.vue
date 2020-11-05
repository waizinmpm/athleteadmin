<template>
    <div class="recruiter-profile-detail row">
         <h5 class="main-header">企業プロフィール詳細</h5> 
        <dl class="detail-list">
            <dt class="detail-head">ご担当者名</dt>
            <dd class="detail-data">{{ recruiter_info.incharge_name }}</dd>
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
        </dl>
        <span @click="$router.go(-1)" class="btn back-btn float-right">一覧へ戻る</span> 
        <!-- <div class="row">
            <div class="col-md-4">ご担当者名</div>
            <div class="col-md-8">{{ recruiter_info.incharge_name }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">設立年月</div>
            <div class="col-md-8">{{ recruiter_info.establishment_date }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">代表者名</div>
            <div class="col-md-8">{{ recruiter_info.representative_name }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">従業員数</div>
            <div class="col-md-8">{{ recruiter_info.num_of_employees }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">事業内容</div>
            <div class="col-md-8">{{ recruiter_info.business_description }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">所在地</div>
            <div class="col-md-8">{{ recruiter_info.address }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">電話番号 1</div>
            <div class="col-md-8">{{ recruiter_info.phone1 }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">電話番号 2</div>
            <div class="col-md-8">{{ recruiter_info.phone2 }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">ご担当者様メールアドレス</div>
            <div class="col-md-8">{{ recruiter_info.email }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">WEB サイト URL</div>
            <div class="col-md-8">{{ recruiter_info.website }}</div>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            recruiter_info : ''
        }
    },

    created() {
        let loading = this.$loading.show();
        this.$api.get("/v1/recruiter/recruiters/" + `${this.$route.params.id}` + "/edit").then(r => {
            console.log("recruiter_info",r.data);
            this.recruiter_info = r.data.data;
            loading.hide()
        })
        .catch((e) => {     
            console.log("errors",e);
        })
        .finally(() => loading.hide());
    }
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
.btn-back {
    margin-right: 20px;
}
</style>