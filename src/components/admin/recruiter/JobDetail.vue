<template>
    <div class="job-detail">
        <h3 class="mb-4 mt-0">{{ recruiter_job.job_number }}【{{ recruiter_job.title }}】</h3>
        <dl class="detail-list">
            <dt class="detail-head">募集ポジション(記入例)チーフディレクター</dt>
            <dd class="detail-data">{{ recruiter_job.incharge_name }}</dd>
            <dt class="detail-head">雇用形態(記入例)正社員</dt>
            <dd class="detail-data">
                <div v-for="(result, index) in employment_types" :key="result.id">
                    <input type="checkbox" v-bind:value="result.employment_type_name" v-bind:id="result.employment_type_name" class="custom-control-input custom-checkbox"              v-model="recruiter_job.employment_types" disabled />
                    <label
                    :for="result.employment_type_name"
                    class="custom-control-label custom-checkbox-label"
                    >{{$t('jobcreate.employment_type['+ index+']')}}</label>
                </div>
            </dd>
            <dt class="detail-head">勤務地(記入例)ジャカルタ</dt>
            <dd class="detail-data">{{ recruiter_job.job_location }}</dd>
            <dt class="detail-head">仕事の内容</dt>
            <dd class="detail-data">{{ recruiter_job.job_description }}</dd>
            <dt class="detail-head">応募資格</dt>
            <dd class="detail-data">{{ recruiter_job.qualification }}</dd>
            <dt class="detail-head">給与・待遇・ビザサポート</dt>
            <dd class="detail-data">{{ recruiter_job.allowance }}</dd>
        </dl>
        <router-link to="/job-list" class="btn btn-back float-right">
            求⼈⼀覧 へ戻る
        </router-link>
        <!-- 
            <div class="row">
                <div class="col-md-4">募集ポジション(記入例)チーフディレクター</div>
                <div class="col-md-8">{{ recruiter_job.incharge_name }}</div>
            </div>
            <div class="row">
            <div class="col-md-4">雇用形態(記入例)正社員</div>
            <div class="col-md-8">
                <div v-for="(result, index) in employment_types" :key="result.id">
                    <input type="checkbox" v-bind:value="result.employment_type_name" v-bind:id="result.employment_type_name" class="custom-control-input custom-checkbox"              v-model="recruiter_job.employment_types" disabled />
                    <label
                    :for="result.employment_type_name"
                    class="custom-control-label custom-checkbox-label"
                    >{{$t('jobcreate.employment_type['+ index+']')}}</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">勤務地(記入例)ジャカルタ</div>
            <div class="col-md-8">{{ recruiter_job.job_location }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">仕事の内容</div>
            <div class="col-md-8">{{ recruiter_job.job_description }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">応募資格</div>
            <div class="col-md-8">{{ recruiter_job.qualification }}</div>
        </div>
        <div class="row">
            <div class="col-md-4">給与・待遇・ビザサポート</div>
            <div class="col-md-8">{{ recruiter_job.allowance }}</div>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return{
            recruiter_job: {
                employment_types: []
            },
            employment_types: []
        }
    },

    created() {
        let loading = this.$loading.show();
        this.$api.get("/v1/recruiter/jobs/" + `${this.$route.params.id}` + "/edit")
        .then((res) => {
            this.recruiter_job = res.data.data;
            this.recruiter_job.employment_types = this.recruiter_job.employment_types.split(",");
            this.$api.get("/v1/recruiter/getalldata")
            .then((response) => {
                this.employment_types = response.data.employment;
                loading.hide();
            })
        });
    }
    
}
</script>
<style scoped>
.detail-list {
    padding: 10px 20px 20px 20px;
    overflow: hidden;
}
.detail-head {
    display: flex;
    float: left;
    width: 40%;
    margin-right: 6%;
    align-items: flex-start;
    font-weight: normal;
}
.detail-data {
    float: left;
    width: 54%;
    background-color: #fff;
    min-height: 50px;
}
.detail-head, 
.detail-data {
    padding: 10px 0 15px 0;
    border-top: 1px solid #ddd;
    line-height: 1.7;
}
.btn-back {
    margin-right: 20px;
}
</style>