<template>
    <div class="recruiter-job-list">
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">求⼈⼀覧</h5>
                <div class="content-row" style="padding-bottom:0px;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="企業番号">企業番号</label>
                            <input type="text" placeholder="企業番号" class="form-control" name="企業番号" />
                        </div>
                        <div class="col-md-3">
                            <label for="企業名">企業名</label>
                            <input type="text" placeholder="企業名" class="form-control" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="求⼈番号">求⼈番号</label>
                            <input type="text" placeholder="求⼈番号" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <label for="求⼈タイトル">求⼈タイトル</label>
                            <input type="text" placeholder="求⼈タイトル" class="form-control" />
                        </div>
                        <div class="col-md-3">
                            <button class="btn searchbtn" style="margin-top:22px;">検索</button>
                        </div>
                    </div>
                    <label for="ステータス">ステータス</label>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="col-md-2 p-lr0">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    name="公開"
                                    id="公開"
                                />
                                <label
                                    for="公開"
                                    class="custom-control-label custom-checkbox-label"
                                >公開</label>
                            </div>
                            <div class="col-md-2 p-lr0">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    id="⾮公開"
                                />
                                <label
                                    for="⾮公開"
                                    class="custom-control-label custom-checkbox-label"
                                >⾮公開</label>
                            </div>
                            <div class="col-md-2 p-lr0">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    id="停⽌"
                                />
                                <label
                                    for="停⽌"
                                    class="custom-control-label custom-checkbox-label"
                                >停⽌</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button class="custom-btn delete" @click="deleteJob">削除</button>
                        </div>
                    </div>
                </div>
                <!--end advanced search-->
            </div>
        </div>
        <table
            id="tbl_jobs"
            class="table table-responsive table-hover table-bordered"
            v-if="jobs.total"
        >
            <thead>
                <tr>
                    <th align="left">
                        <input type="checkbox" id="chkAll" v-model="checked_all" />
                    </th>
                    <th>企業番号</th>
                    <th>企業名</th>
                    <th>求⼈番号</th>
                    <th>求⼈タイトル</th>
                    <th>求⼈応募者数</th>
                    <th>スカウト受託者数</th>
                    <th class="onebutton-wrapper">掲載期間</th>
                    <th class="onlybutton-wrapper">ステータス</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="job of jobs.data" :key="job.id">
                    <td>
                        <input
                            type="checkbox"
                            name="employees"
                            v-model="checked"
                            :value="job.id"
                        />
                    </td>
                    <td>{{ job.recruiter_id }}</td>
                    <td>{{ job.recruiter_show_name }}</td>
                    <td>{{ job.job_number }}</td>
                    <td>{{ job.title }}</td>
                    <td>{{ job.application_address }}</td>
                    <td>{{ job.message }}</td>
                    <td>{{ job.job_post_date }}~{{ job.job_post_date }}</td>
                    <td class="td-btn">
                        <span>{{ job.job_post_status }}</span>
                        <button class="custom-btn change">変更</button>
                    </td>
                    <td>
                        <button class="custom-btn edit">編集</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <pagination :limit="1" :data="jobs" @pagination-change-page="getPaginatedJobs">
                <span slot="prev-nav">&lt; Previous</span>
                <span slot="next-nav">Next &gt;</span>
            </pagination>
        </div>
    </div>
</template>

<script>
import api from "../../../api/apiBasePath";
export default {
    data() {
        return {
            jobs: {},
            checked: []
        };
    },
    computed: {
        checked_all: {
            get: function() {
                return this.jobs.data
                    ? this.checked.length == this.jobs.data.length
                    : false;
            },
            set: function(value) {
                var checked = [];
                if (value) {
                    this.jobs.data.forEach(function(job) {
                        checked.push(job.id);
                    });
                }
                this.checked = checked;
            }
        }
    },
    created() {
        api.post("/v1/admin/job-list")
            .then(response => {
                this.jobs = response.data;
                console.log(this.jobs.data.length)
            })
            .catch(err => {
                let errObj = err.response.data;
                console.log(errObj);
            });
    },
    mounted() {},
    methods: {
        getPaginatedJobs(page) {
            api.post("/admin/job-list?page=" + page).then(response => {
                this.jobs = response.data;
            });
        },
        deleteJob() {
            let all_jobs = this.jobs.data;
            let checked_count = this.checked.length;
            if (checked_count > 0) {
                console.log(this.checked)
                for (var id in this.checked) {
                    let i = all_jobs.map(item => item.id).indexOf(id); // find index of your object
                    all_jobs.splice(i, 1);
                }
            }
        }
    }
};
</script>