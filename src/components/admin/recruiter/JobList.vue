<template>
    <div class="recruiter-job-list">
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('common.recruitment') }}</h5>
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
                        <div for>{{ $t('common.total_results') }}: {{ $tc('common.item', projects.total, { n:projects.total }) }}</div>
                        <span>{{ projects.current_page }}{{ $t('common.displayed_page') }}</span>&nbsp;
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
                    :columns="$t('job_list.columns')"
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
                            <td>{{ project.job_apply.length == 0 ? '-' : project.job_apply.length }}</td>
                            <td>{{ project.scout.length == 0 ? '-' : project.scout.length}}</td>
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
                                <router-link :to="{ name: 'edit', params: { id: project.id } }" class="btn custom-btn edit">{{ $t('common.edit')}}</router-link>
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
        /* let columns = [
            { label: "common.recruiter_id", name: "recruiter_id" },
            { label: "common.recruiter_name", name: "recruiter_show_name" },
            { label: "common.job_number", name: "job_number" },
            { label: "common.job_title", name: "title" },
            { label: "joblist.no_of_applicants", name: "no_of_applicants" },
            { label: "joblist.scout_trust", name: "scout_trustees" },
            { label: "joblist.post_period", name: "post_period" },
            { label: "common.status", name: "job_post_status" },
            { label: "", name: "status_button" }
        ]; */
        let columns = [];
        columns.forEach(column => {
            sortOrders[column.name] = -1;
        });
        let filteredData = {
            status: []
        };
        return {
            base_url: "v1/admin/job-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            recordStatus: [
                this.$configs.job.public,
                this.$configs.job.private,
                this.$configs.job.stopped
            ]
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
        /* editJob(jobId){
            //alert("job id -> "+ jobId);
            this.$router.push({ name: "edit", params: { id: jobId } });
        } */
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
