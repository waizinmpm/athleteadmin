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
                            <div class="col-md-2 p-lr0" v-for="status in arr_status" :key="status.id.id">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    name="record_status"
                                    id="record_status"
                                    v-model="filteredData.status"
                                    @change="getData()"
                                    :value="status.id.value"
                                />
                                <label
                                    for="record_status"
                                    class="custom-control-label custom-checkbox-label"
                                >{{status.id.display}}</label>
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
                        <button
                            class="btn custom-btn delete"
                            style="float:right"
                            :disabled="isDisabled"
                            @click="deleteData()"
                        >{{ $t('common.delete') }}</button>
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
                        <tr v-for="(project, index) in projects.data" :key="project.id">
                            <td>
                                <label class="form-checkbox">
                                    <input type="checkbox" :value="project.id" v-model="selected" />
                                </label>
                            </td>
                            <td>{{ project.recruiter_number }}</td>
                            <td>{{ project.recruiter_name }}</td>
                            <td>{{ project.job_number }}</td>
                            <td>{{ project.title }}</td>
                            <td>{{ project.jobapplied_count == 0 ? '-' : project.jobapplied_count }}</td>
                            <td>{{ project.scout_count == 0 ? '-' : project.scout_count}}</td>
                            <td>{{ project.job_post_date | moment('YYYY/MM/D') }} ~ {{ project.job_post_date | moment("add", "1 month") | moment('YYYY/MM/D') }}</td>
                            <td>
                                
                                <div class="scout-box">
                                    <p class="scout-txt" >
                                        <span v-for="status in arr_status" :key="status.id.id">
                                            {{project.record_status == status.id.value ? status.id.display : ''}}
                                        </span>
                                    </p>
                                    <p class="btn btn-common" v-on:click="showToggle(index)">
                                        {{$t('common.change')}}
                                        <span class="down-icon">&#9662;</span>
                                    </p>
                                    <div class="scout-toggle"  :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (status == true)}">
                                        <p class="custom-radio-group mr-3"  v-for="status in arr_status" :key="status.id.id">
                                            <input type="radio" :id="status.id.display+index" v-model="project.record_status" class="custion-radio" 
												@change="changeStatus(project.id, status.id.value)" :value="status.id.value">
                                            <label :for="status.id.display+index" class="custom-radio-lable status-lable" @click="hideToggle">{{ status.id.display }}</label>
                                        </p>
                                    </div>
                                </div>
                                <!-- <div v-for="status in recordStatus" :key="status.id">
                                    <input type="radio" :id="status" :value="status.value" v-model="project.record_status">
                                    <label for="">{{status.display}}</label>
                                </div>
                                <button
                                    class="custom-btn change"
                                    @click="changeStatus(project.id, project.record_status)"
                                >{{ $t('common.change') }}</button> -->
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

export default {
    mixins: [DataTableServices],
    data() {
        let sortOrders = {};
        let columns = this.$i18n.messages.en.job_list.columns;
        columns.forEach(column => {
            sortOrders[column.label] = -1;
        });
        /* columns.forEach(column => {
            sortOrders[column.name] = -1;
        }); */
        let filteredData = {
            status: []
        };
        return {
            base_url: "v1/admin/job-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            current: null,
            old_index:'',
            status:false,
            arr_status: [
				{ id: this.$configs.job.public, checked: false },
				{ id: this.$configs.job.private, checked: false },
				{ id: this.$configs.job.stopped, checked: false },
			],
        };
    },

    computed: {
        isDisabled() {
            //if dont select any row, set disable delete button
            return this.selected.length > 0 ? false : true;
        },
    },

    methods: {
        changeStatus(id, status) {
            this.$alertService
            .showConfirmDialog(null, this.$t('dialog_box.confirm_change_message'), this.$t('common.yes'), this.$t('common.no'))
            .then((dialogResult) => {
                if(dialogResult.value){
                    let statusData = {};
                    this.$set(statusData, "id", id);
                    this.$set(statusData, "status", status);
                    this.$api.post(this.base_url + `/change-status`, statusData)
                        .then(response => {
                            console.log("changeStatus", response.data);
                            //let getpage = this.projects.to > this.projects.from ? this.projects.current_page : 1;
                            this.getData(this.projects.current_page);
                        })
                        .catch(errors => {
                            console.log(errors);
                        });
                }else{
                    this.getData(this.projects.current_page);
                }
            });
        },

		showToggle(index) {
			this.current = index;
			if(this.status == true) {
                if(this.current == this.old_index)
                    this.status = false; 
			} else {
				this.status = true;
			}
			this.old_index = index;
        },
        
		hideToggle() {
			this.status = false;
		},
    },

    mounted() {
        console.log(this.projects);
    }
};
</script>
