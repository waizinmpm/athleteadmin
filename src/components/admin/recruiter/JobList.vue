<template>
    <div class="recruiter-job-list" @click="handleStatusToggle">
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="main-header">{{ $t('common.recruitment') }}</h5>
                <div class="inner-wrapper">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="企業番号">{{ $t('common.recruiter_number') }}</label>
                            <input
                                type="text"
                                :placeholder="$t('common.recruiter_number')"
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
                    <div class="row d-flex align-items-end">
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
                        <div class="col-md-3 ml-auto">
                            <button
                                class="btn searchbtn float-right"
                                @click="getData()"
                            >{{ $t('common.search') }}</button>
                        </div>
                    </div>
                </div>
                <label for="ステータス">{{ $t('common.status') }}</label>
                <div class="status-row">
                    <div class="status-col " v-for="status in arr_status" :key="status.id.id">
                        <label
                            :for="status.id.display"
                            class="custom-control-label custom-checkbox-label"
                        >
                        <input
                            type="checkbox"
                            class="custom-control-input custom-checkbox"
                            name="record_status"
                            :id="status.id.display"
                            v-model="filteredData.status"
                            @change="getData()"
                            :value="status.id.value"
                        />
                        <span class="custom-check-label-post">{{status.id.display}}</span>
                        </label>
                        <!-- <span class="tooltiptext">{{status.id.display}}</span> -->
                    </div>
                </div>
                <div class="status-row">
                    <div class="status-col tooltip-box">
                        <label for="deactivate" class="custom-control-label custom-checkbox-label">
                            <input
                                type="checkbox"
                                class="custom-control-input custom-checkbox"
                                name="recruiter_status"
                                id="deactivate"
                                v-model="filteredData.recruiter_status"
                                @change="getData()"
                                value="退会"
                            />
                            <span class="custom-check-label-post">退会した会員も表示</span>
                        </label>
                        <!-- <span class="tooltiptext">退会</span> -->
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
                            class="btn custom-btn float-right"
                            :disabled="isDisabled"
                            @click="deleteData()"
                        >{{ $t('common.delete') }}</button>
                    </div>
                </div>
                
                <div class="vld-parent" style="width: 100%;" ref="loadingRef">
                    <DataTable
                        ref="datatable"
                        :columns="$t('job_list.columns')"
                        :sortKey="sortKey"
                        :sortOrders="sortOrders"
                        @check-all="selectAll"
                        @sort="sortBy"
                        :showCheckbox="true"
                        :totalLength = projects.total
                    >
                        <tbody>
                            <tr v-for="(project, index) in projects.data" :key="project.id">
                                <td class="check-col">
                                    <label class="form-checkbox">
                                        <input type="checkbox" :value="project.id" v-model="selected" />
                                        <div v-for="undelete_id in delete_ids_transactions" :key="undelete_id.id" style="color:red;">
                                            <!-- {{ undelete_id == project.id ? 'cant delete' : ''}} -->
                                            <!-- project.record_status != 3 -->
                                            <span v-show="undelete_id == project.id" class="error-msg">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </label>
                                </td>
                                <td class="text-left job-col">
                                    <router-link :to="{ name: 'recruiter-job-detail', params: { id: project.id }}">
                                        <span class="job-no">{{ project.job_number }}</span>
                                        <span class="txt-vertical-ellipsis job-tit">{{ project.title }}</span>
                                    </router-link>
                                </td>
                                <td class="text-left tbl-wl">
                                    <router-link :to="{ name: 'recruiter-detail', params: { id: project.recruiters_id }}" class="d-flex">{{ project.recruiter_number }}
                                     <span class="ml-2 txt-vertical-ellipsis" style="width:100px;">{{ project.recruiter_name }}</span>
                                    </router-link>
                                </td>
                                <!-- <td class="tbl-wm"><router-link :to="{ name: 'recruiter-job-detail', params: { id: project.id }}">{{ project.job_number }}</router-link></td>
                                <td class="text-left" style="min-width:200px;" @click="textEllipsis($event)"><p class="txt-vertical-ellipsis"><router-link :to="{ name: 'recruiter-job-detail', params: { id: project.id }}">{{ project.title }}</router-link></p></td> -->
                                <td class="tbl-wl">{{ project.jobapplied_count == 0 ? '-' : project.jobapplied_count }}</td>
                                <td class="tbl-wl">{{ project.scout_count == 0 ? '-' : project.scout_count}}</td>
                                <td class="tbl-ws">{{ project.job_post_date | moment('YYYY/MM/D') }} ~ {{ project.job_post_date | moment("add", "1 month", "subtract", "1 day") | moment('YYYY/MM/D') }}</td>
                                <td class="tbl-ws tbl-status">
                                    <div class="scout-box">
                                        <div class="scout-txt tooltip-box">
                                            <span v-for="status in arr_status" :key="status.id.id">
                                                {{project.record_status == status.id.value ? status.id.display : ''}}
                                            </span>
                                             
                                            <p class="tooltiptext">
                                               <span class="d-block" v-for="status in arr_status" :key="status.id.id">
                                               {{ status.id.display }}
                                            </span>
                                            </p>
                                        </div>
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
                                <td class="tbl-ws">
                                    <router-link :to="{ name: 'edit', params: { id: project.id } }" class="btn btn-info">{{ $t('common.edit')}}</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </DataTable>
                </div>
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
                        <i class="fa fa-angle-right"></i>
                    </span>
                </pagination>
            </div>
        </div>
    </div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";
import { textEllipsis } from "../../../partials/common";

export default {
    mixins: [DataTableServices],
    data() {
        let sortOrders = {};
        let columns = this.$i18n.messages.en.job_list.columns;
        columns.forEach(column => {
            sortOrders[column.label] = -1;
        });
        let filteredData = {
            status: [],
            recruiter_status : ''
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
        handleStatusToggle(e) {
            let targetClassName = e.target.className;
            // must be Class Names of changing status dropdown
            const statusToggleClasses = [
                'btn btn-common',
                'down-icon',
                'custom-radio-lable status-lable',
                'custion-radio'
            ];
            statusToggleClasses.includes(targetClassName) ? '' : this.hideToggle();
        },

        textEllipsis(event){
            event.target.className = textEllipsis(event.target.className);
        },

        changeStatus(id, status) {
            
            let statusVal = (status == 1? '公開': (status == 2 ? '非公開' : '停止'));
            this.$alertService.showConfirmDialog(null, this.$tc('alertMessage.change_confirm_message', statusVal, { n:statusVal }), this.$t('common.yes'), this.$t('common.no'))
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
    }
};
</script>
<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}
.tooltip-box .tooltiptext {
  visibility: hidden;
  min-width: 150px;
  background-color: rgba(180, 197, 116,0.95);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 10px;
  position: absolute;
  z-index: 33;
  bottom: 150%;
  left: 50%;
  margin-left: -60px;
}

.tooltip-box .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(180, 197, 116,0.95) transparent transparent transparent;
}

.tooltip-box:hover .tooltiptext {
  visibility: visible;
}
.scout-txt.tooltip-box .tooltiptext {
    padding: 8px 15px;
    left: 40%;
}
.scout-txt.tooltip-box .tooltiptext::after {
    border-width: 8px; 
}
tr:first-child .tbl-status .tooltip-box .tooltiptext::after {
    top: 112%;
}
.job-col {
    position: relative;
}
.job-no {
    position: absolute;
}
.job-tit {
    margin-left: 95px;
}
</style>