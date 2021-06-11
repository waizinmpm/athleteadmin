<template>
    <div class="job-detail row">
        <h5 class="main-header"><span class="job-no">{{ recruiter_job.job_number }}</span> {{ recruiter_job.title }}</h5>
        <label v-if="$route.name == 'scout-job'">より、以下の条件でアスリート会員をスカウトしました。</label>
        <dl class="detail-list" v-if="$route.name == 'scout-job'">
            <dt class="detail-head" v-if="$route.name == 'scout-job'">募集ポジション</dt>
            <dt class="detail-head" v-else>職種</dt>
            <dd class="detail-data">
                <pre>{{ recruiter_job.occupation_description || '-' }}</pre>
            </dd>
            <dt class="detail-head">雇用形態</dt>
            <dd class="detail-data">
                <div v-for="(result, index) in employment_types" :key="result.id">
                    <input type="checkbox" v-bind:value="result.employment_type_name" v-bind:id="result.employment_type_name" class="custom-control-input custom-checkbox"              v-model="recruiter_job.employment_types" disabled />
                    <label :for="result.employment_type_name" class="custom-control-label custom-checkbox-label" >{{$t('jobcreate.employment_type['+ index+']')}}</label>
                </div>
            </dd>
            <dt class="detail-head">勤務地詳細</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.job_location || '-' }}</pre></dd>
        </dl>
        <dl class="detail-list" v-else>
            <dt style="color: rgb(0, 98, 255);" v-if="recruiter_job.job_update_date">
                {{recruiter_job.created_at != recruiter_job.job_update_date ? recruiter_job.job_update_date : ''}}
                に求人詳細が修正されています</dt>
            <!-- show job update date -->
            <!-- <dt class="detail-head">求人タイトル</dt>
            <dd class="detail-data">{{ recruiter_job.title }}</dd> -->
            <dt class="detail-head">職種</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.occupation_description || '-' }}</pre></dd>
            <dt class="detail-head">雇用形態</dt>
            <dd class="detail-data">
                <div v-for="(result, index) in employment_types" :key="result.id">
                    <input type="checkbox" v-bind:value="result.employment_type_name" v-bind:id="result.employment_type_name" class="custom-control-input custom-checkbox"              v-model="recruiter_job.employment_types" disabled />
                    <label
                    :for="result.employment_type_name"
                    class="custom-control-label custom-checkbox-label"
                    >{{$t('jobcreate.employment_type['+ index+']')}}</label>
                </div>
            </dd>
            <dt class="detail-head">仕事内容</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.job_description || '-' }}</pre></dd>
            <dt class="detail-head">応募資格</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.qualification || '-' }}</pre></dd>
            <dt class="detail-head">給与・待遇</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.allowance || '-' }}</pre></dd>
            <dt class="detail-head">給与 (求人掲載用)</dt>
            <dd class="detail-data"><pre>{{ (!recruiter_job.payment_type && !recruiter_job.salary) ? '-' : (recruiter_job.payment_type || '') + (recruiter_job.salary ? recruiter_job.salary + '円 ～' : '') }}</pre></dd>
            <dt class="detail-head">勤務開始日</dt>
            <dd class="detail-data">{{ recruiter_job.job_start_date || '-' }}</dd>
            <dt class="detail-head">勤務地詳細</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.job_location || '-' }}</pre></dd>
            <dt class="detail-head">応募先アドレス</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.application_address || '-' }}</pre></dd>
            <dt class="detail-head">アスリートへのメッセージ</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.message || '-' }}</pre></dd>
            <dt class="detail-head">勤務地 (検索用キーワード)</dt>
            <dd class="detail-data">
                <span v-for="country in countries" :key="country.id">
                    {{ recruiter_job.country_id == country.id ? country.country_name : ''}}
                </span>
            </dd>
            <dt class="detail-head">職種(検索用キーワード)</dt>
            <dd class="detail-data">
                <span v-for="occupation in occupations" :key="occupation.id">
                    {{ recruiter_job.occupation_id == occupation.id ? occupation.occupation_name : ''}}
                </span>
            </dd>
            <dt class="detail-head">その他キーワード (求人情報に表示されます)</dt>
            <dd class="detail-data">
                <div v-for="(keyword, index) in other_keywords" :key="index">
                    <input
                    type="checkbox"
                    :value="keyword"
                    :id="keyword"
                    class="custom-control-input custom-checkbox"
                    v-model="recruiter_job.other_keywords"
                    disabled
                    />
                    <label
                    :for="keyword"
                    class="custom-control-label custom-checkbox-label"
                    >{{ $t('jobcreate.other_keywords['+ index+']') }}</label>
                </div>
            </dd>
            <dt class="detail-head">掲載開始日</dt>
            <dd class="detail-data">{{ recruiter_job.job_post_date || '-' }}</dd>
            <!-- <dt class="detail-head">仕事の内容</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.job_description }}</pre></dd>
            <dt class="detail-head">応募資格</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.qualification }}</pre></dd>
            <dt class="detail-head">給与・待遇</dt>
            <dd class="detail-data"><pre>{{ recruiter_job.allowance }}</pre></dd> -->
        </dl>
        <span @click="$router.go(-1)" class="btn btn-back float-right">一覧へ戻る</span>
        <!-- <span @click="goBack" class="btn btn-back float-right">一覧へ戻る</span> -->
    </div>
</template>

<script>
export default {
    data() {
        return{
            recruiter_job: {},
            employment_types: [],
            occupations: [],
            countries: [],
            other_keywords: [
                "新卒歓迎",
                "未経験歓迎",
                "シニア歓迎",
                "上場企業",
                "セカンドキャリア採用",
                "デュアルキャリア採用"
            ],
        }
    },

    created() {
        
        this.getJobInfo();
        /* // let loading = this.$loading.show();
        this.$api.get("/v1/recruiter/jobs/" + `${this.$route.params.id}` + "/edit")
        .then((res) => {
            this.recruiter_job = res.data.data;
            this.recruiter_job.employment_types = this.recruiter_job.employment_types.split(",");
            this.$api.get("/v1/recruiter/getalldata")
            .then((response) => {
                this.employment_types = response.data.employment;
                // loading.hide();
            })
        }); */
    },

    methods : {
        async getJobInfo() {
            let loading = this.$loading.show();
            try {
                const response = await Promise.all([
                    this.$api.get("/v1/recruiter/jobs/" + `${this.$route.params.id}` + "/detail"),
					this.$api.get("/v1/recruiter/getalldata")
				]);
				const temp_job = response[0].data.data;
                this.employment_types   = response[1].data.employment;
                this.occupations        = response[1].data.occupation;
                this.countries          = response[1].data.country;
				
				// Get scout occupation, types, location if route is scout job
				if (this.isScoutJob) {
					const scout_id = this.$route.query.sid;
					if (scout_id) {
						const r = await this.$api.get(`/v1/admin/scout-list/${scout_id}`)
						const scout = r.data.data;
						this.recruiter_job = Object.assign({}, temp_job, { 
							occupation_description:  scout.occupation_description,
							employment_types: scout.employment_types,
							job_location: scout.job_location
						});
					}
				} else {
					this.recruiter_job = temp_job;
				}
				this.recruiter_job.employment_types = this.recruiter_job.employment_types.split(",").filter(i => i);
				this.recruiter_job.other_keywords   = this.recruiter_job.other_keywords.split(",").filter(i => i);
            } catch (error) {
                console.log(error);
            }
            loading.hide();
        },

        /* goBack() {
            // let paginate = {
            //     page: this.$route.name,
            //     page_no: this.$store.getters.getPaging.page_no,
            // }
            // this.$store.commit('setPaging',paginate);
            this.$router.go(-1);
        }, */
	},
	computed: {
		isScoutJob() {
			return this.$route.name == 'scout-job';
		}
	}
    
}
</script>
<style scoped>
.detail-list {
    padding: 10px 0 20px 0;
    overflow: hidden;
}
.detail-head {
    display: flex;
    float: left;
    width: 40%;
    margin-right: 4%;
    align-items: flex-start;
    font-weight: normal;
}
.detail-data {
    float: left;
    width: 56%;
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
.custom-checkbox {
    vertical-align: text-bottom;
}
.custom-checkbox-label {
    vertical-align: baseline;
}
.job-no {
    color: #666;
}
</style>