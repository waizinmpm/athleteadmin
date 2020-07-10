<template>
    <div class="recruiter-job-list">
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">求⼈⼀覧</h5>
                <div class="content-row" style="padding-bottom:0px;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="企業番号">{{ $t('common.recruiter_id') }}</label>
                            <input
                                type="text"
                                :placeholder="$t('common.recruiter_id')"
                                class="form-control mx-input"
                                name="企業番号"
                                v-model="filteredData.company_number"
                            />
                        </div>
                        <div class="col-md-3">
                            <label for="企業名">{{ $t('common.recruiter_name') }}</label>
                            <input
                                type="text"
                                :placeholder="$t('common.recruiter_name')"
                                class="form-control mx-input"
                                v-model="filteredData.company_name"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="求⼈番号">{{ $t('common.job_number') }}</label>
                            <input
                                type="text"
                                :placeholder="$t('common.job_number')"
                                class="form-control mx-input"
                                v-model="filteredData.job_number"
                            />
                        </div>
                        <div class="col-md-3">
                            <label for="求⼈タイトル">{{ $t('common.job_title') }}</label>
                            <input
                                type="text"
                                :placeholder="$t('common.job_title')"
                                class="form-control mx-input"
                                v-model="filteredData.job_title"
                            />
                        </div>
                        <div class="col-md-3">
                            <button
                                class="btn searchbtn"
                                style="margin-top:22px;"
                                @click="getData()"
                            >{{ $t('common.search') }}</button>
                        </div>
                    </div>
                    <label for="ステータス">{{ $t('common.status') }}</label>
                    <div class="row">
                        <div class="col-md-6">
                            <div
                                class="col-md-2 p-lr0"
                                v-for="(status, name) in recordStatus"
                                :key="status.id"
                            >
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    name="record_status"
                                    id="record_status"
                                    v-model="filteredData.status"
                                    :value="name"
                                />
                                <label
                                    for="record_status"
                                    class="custom-control-label custom-checkbox-label"
                                >{{status}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!-- <button class="custom-btn delete" @click="deleteJob">削除</button> -->
                        </div>
                    </div>
                </div>
                <!--end advanced search-->
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 p-0">
                <div class="row">
                    <div class="col-sm-6 select">
                        <div for>検索結果表示件数: {{ projects.total }}件</div>
                        <span>{{ projects.current_page }}ページ表示数</span>&nbsp;
                        <select v-model="tableData.length" @change="getData()">
                            <option
                                v-for="(records, index) in perPage"
                                :key="index"
                                :value="records"
                            >{{records}}</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <span
                            class="btn custom-btn delete"
                            style="float:right"
                            @click="deleteData()"
                        >{{ $t('common.delete') }}</span>
                    </div>
                </div>
                
                <DataTable
                    ref="datatable"
                    :columns="columns"
                    :sortKey="sortKey"
                    :sortOrders="sortOrders"
                    @check-all="selectAll"
                    @sort="sortBy"
                >
                    <tbody>
                        <tr v-for="project in projects.data" :key="project.id">
                            <td>
                                <label class="form-checkbox">
                                    <input type="checkbox" :value="project.id" v-model="selected" />
                                </label>
                            </td>
                            <td>{{ project.recruiter.recruiter_number }}</td>
                            <td>{{ project.recruiter.recruiter_name }}</td>
                            <td>{{ project.job_number }}</td>
                            <td>{{ project.title }}</td>
                            <td>{{ project.application_address }}</td>
                            <td>{{ project.message }}</td>
                            <td>{{ project.job_post_date | date('%Y-%m-%d') }}</td>
                            <td>
                                <div v-for="(status, name) in recordStatus" :key="status.id">
                                    <span v-if="name == project.record_status">{{status}}</span>
                                </div>
                                <button
                                    class="custom-btn change"
                                    @click="changeStatus(project.id, project.record_status)"
                                >{{ $t('common.change') }}</button>
                            </td>
                            <td>
                                <button class="custom-btn edit">{{ $t('common.edit') }}</button>
                            </td>
                        </tr>
                    </tbody>
                </DataTable>
                <pagination
                    v-if="projects.length != 0"
                    :data="projects"
                    @pagination-change-page="getData"
                    :limit="limitpc"
                >
                    <span slot="prev-nav">
                        <i class="fas fa-angle-left"></i> 前へ
                    </span>
                    <span slot="next-nav">
                        次へ
                        <i class="fas fa-angle-right"></i>
                    </span>
                </pagination>
            </div>
        </div>
        <!-- <table id="tbl_jobs" class="table table-responsive table-hover table-bordered" v-if="jobs.total">
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
                        <input type="checkbox" name="employees" v-model="checked" :value="job.id" />
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
        </div>-->
    </div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";
import api from "../../../api/apiBasePath";

export default {
    mixins: [DataTableServices],
    data() {
        let sortOrders = {};
        let columns = [
            { label: "企業番号", name: "recruiter_id" },
            { label: "企業名", name: "recruiter_show_name" },
            { label: "求⼈番号", name: "job_number" },
            { label: "求⼈タイトル", name: "title" },
            { label: "求⼈応募者数", name: "application_address" },
            { label: "スカウト受託者数", name: "message" },
            { label: "掲載期間", name: "job_post_date" },
            { label: "ステータス", name: "job_post_status" },
            { label: "", name: "status_button" }
        ];
        columns.forEach(column => {
            sortOrders[column.name] = -1;
        });
        let filteredData = {
            //freeword: "",
            //jobseeker_recordstatus: [],
            status: []
        };
        return {
            base_url: "v1/admin/job-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            recordStatus: {
                1: "非公開",
                2: "公開",
                3: "停止"
            }
        };
    },
    methods: {
        changeStatus(id, status) {
            let statusData = {};
            this.$set(statusData, "id", id);
            this.$set(statusData, "status", status);
            api.post(this.base_url + `/change-status`, statusData)
                .then(response => {
                    console.log(response.data);
                    console.log(this.projects.data.length);
                    if (this.projects.data.length == 0) {
                        this.getData(this.projects.current_page - 1);
                    }else{
                        this.getData(this.projects.current_page);
                    }
                    
                })
                .catch(errors => {
                    console.log(errors);
                });
        }
    },
    mounted() {
        console.log(this.projects);
    }
};

/* import api from "../../../api/apiBasePath";
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
}; */
</script>