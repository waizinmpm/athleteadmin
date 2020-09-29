<template>
    <div class="recruiter-profile-detail">
        <h3>Recruiter's Profile Detail</h3>
        <router-link to="/admin-recruiter-list" class="ml-auto">
            <span class="btn back-btn">会員情報一覧へ戻る</span>
        </router-link>
        <hr>
        <div class="row">
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
        </div>
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

</style>