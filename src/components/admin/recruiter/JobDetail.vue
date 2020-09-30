<template>
    <div class="job-detail">
        <h3>{{ recruiter_job.job_number }}【{{ recruiter_job.title }}】</h3>
        <router-link to="/job-list" class="ml-auto">
            <span class="btn back-btn">求⼈⼀覧 へ戻る</span>
        </router-link>
        <hr/>
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
        </div>
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