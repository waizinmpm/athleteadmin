<template>
    <div class="recruiter-job-list">
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">求⼈⼀覧</h5>
                <div class="content-row">
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
                            <div class="col-md-2 p-lr0" v-for="status in recordStatus" :key="status.id">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    name="record_status"
                                    id="record_status"
                                    v-model="filteredData.status"
                                    @change="getData()"
                                    :value="status.value"
                                />
                                <label
                                    for="record_status"
                                    class="custom-control-label custom-checkbox-label"
                                >{{status.display}}</label>
                            </div>
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
                    :showCheckbox="true"
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
                            <td>{{ project.job_apply.length }}</td>
                            <td>{{ project.scout.length }}</td>
                            <td>{{ project.job_post_date | moment('YYYY/MM/D') }} ~ {{ project.job_post_date | moment("add", "1 month") | moment('YYYY/MM/D') }}</td>
                            <td>
                                <div v-for="status in recordStatus" :key="status.id">
                                    <input type="radio" :id="status" :value="status.value" v-model="project.record_status">
                                    <label for="">{{status.display}}</label>
                                </div>
                                <button
                                    class="custom-btn change"
                                    @click="changeStatus(project.id, project.record_status)"
                                >{{ $t('common.change') }}</button>
                            </td>
                            <td>
                                <router-link :to="'/job-list/' + project.id + '/edit'" class="btn custom-btn edit">{{ $t('common.edit')}}</router-link>
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
        return {//
            base_url: "v1/admin/job-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            /* recordStatus: {
                1: "非公開",
                2: "公開",
                3: "停止"
            }, */
            recordStatus: [
                this.$configs.job.private,
                this.$configs.job.public,
                this.$configs.job.stopped
            ],
            tblStatus:''
        };
    },
    methods: {
        changeStatus(id, status) {
            let statusData = {};
            this.$set(statusData, "id", id);
            this.$set(statusData, "status", status);
            api.post(this.base_url + `/change-status`, statusData)
                .then(response => {
                    console.log("changeStatus", response.data);
                    let getpage = this.projects.to > this.projects.from ? this.projects.current_page : 1;
                    this.getData(getpage);
                })
                .catch(errors => {
                    console.log(errors);
                });
        },
        editJob(jobId){
            alert("job id -> "+ jobId);
        }
        /* reverse: function (jobdate) {
            var job_post_date = new Date(jobdate);
        return job_post_date.setMonth(job_post_date.getMonth()+1);
        } */
    },
    mounted() {
        console.log(this.projects);
    }
};
</script>
