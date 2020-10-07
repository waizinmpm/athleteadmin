<template>
    <div @click="handleStatusToggle">
        <div class="row">
        <div class="col-sm-6 p-0 searchform-one">
            <!--advanced search-->
            <h5 class="m-b-10 main-header">{{ $t('jobseeker_list.jobseeker_member_list') }}</h5>
            <div class="content-row" style="padding-bottom:0px;margin-left:0px;">
                <div class="row">
                    <div class="col-md-12">
                    <div class="input-group">
                        <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('jobseeker_list.search_jobseeker_placeholder')"
                        id="inputGroup"
                        v-model="filteredData.freeword"
                        />
                        
                        <span class="input-group-addon bg-color"  @click="getData()">
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                    </div>
                </div>

                <label for="ステータス">{{ $t('common.status') }}</label>
                <div class="row">
                    <div class="col-md-12">
                    <div class="col-md-2 p-lr0">
                        <label for="有効" class="custom-control-label custom-checkbox-label">
                        <input
                            type="checkbox"
                            class="custom-control-input custom-checkbox"
                            value="1"
                            v-model="filteredData.jobseeker_recordstatus"
                            @change="getData()"
                            id="有効"
                        />
                        <span class="custom-check-label-post">有効</span>
                        </label>
                    </div>
                    <div class="col-md-2 p-lr0">
                        <label for="無効" class="custom-control-label custom-checkbox-label">
                        <input
                            type="checkbox"
                            class="custom-control-input custom-checkbox"
                            value="2"
                            v-model="filteredData.jobseeker_recordstatus"
                            @change="getData()"
                            id="無効"
                        />
                        <span class="custom-check-label-post">停止</span>
                        </label>
                    </div>
                    <div class="col-md-2 p-lr0">
                        <label for="退会" class="custom-control-label custom-checkbox-label">
                        <input
                            type="checkbox"
                            class="custom-control-input custom-checkbox"
                            value="0"
                            v-model="filteredData.jobseeker_recordstatus"
                            @change="getData()"
                            id="退会"
                        />
                        <span class="custom-check-label-post">退会</span>
                        </label>
                    </div>
                    </div>
                </div>
            </div>
            <!--end advanced search-->
        </div>
        </div>
        <div class="row">
            <div class="col-sm-12 p-0">
                <div class="row d-flex align-items-end">
                <div class="col-sm-6 select">
                    <div
                    for
                    >{{ $t('common.total_results') }}: {{ $tc('common.item', projects.total, { n:projects.total }) }}</div>
                    <span>{{ projects.current_page }}{{ $t('common.displayed_page') }}</span>&nbsp;
                    <select v-model="tableData.length" @change="getData()">
                    <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
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

                <DataTable
                ref="datatable"
                :columns="$t('jobseeker_list.columns')"
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
                        <span v-if="project.record_status != 0">
                            <input type="checkbox" :value="project.id" v-model="selected" />
                            <div
                            v-for="undelete_id in delete_ids_transactions"
                            :key="undelete_id.id"
                            style="color:red;"
                            >
                                <!-- {{ undelete_id == project.id ? 'cant delete' : ''}} -->
                                <span v-show="undelete_id == project.id" class="error-msg">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                    </svg>
                                </span>
                            </div>
                        </span>
                        </label>
                    </td>
                    <td><router-link class="txt-underline" :to="{ name: 'jobseeker-detail', params: { id: project.id }}">{{project.jobseeker_number}}</router-link></td>
                    <td><router-link class="txt-underline" :to="{ name: 'jobseeker-detail', params: { id: project.id }}">{{project.jobseeker_name}}</router-link></td>
                    <td class="tbl-wm">
                        <div class="toggle-box" v-if="project.record_status != 0">
                            <div class="scout-box">
                                <router-link class="txt-underline" :to="{ name: 'jobseeker-detail', params: { id: project.id }}">
                                    <span class="scout-txt text-center">{{project.record_status == 1 ? '有効' : (project.record_status == 2 ? '停止' : '退会')}}</span>
                                </router-link><br>
                                <span class="btn btn-common mt-2" v-on:click="showToggle(index)" v-show="project.record_status != 3">
                                {{$t('common.change')}}
                                <span class="down-icon">&#9662;</span>
                                </span>
                                <div
                                class="scout-toggle"
                                :id="'scout-status'+index"
                                v-bind:class="{'scout-expand': (current === index) && (status == true)}"
                                >
                                <p class="custom-radio-group mr-3" v-for="status in arr_status"                  v-bind:key="status.id.id" >
                                    <input type="radio" :id="status.id.display+index" v-model="project.record_status"
                                    class="custion-radio" @change="changeStatus(project.id, status.id.value)"
                                    :value="status.id.display == '有効' ? 1 : (status.id.display == '停止' ? 2 : 3) " />
                                    <label
                                    :for="status.id.display+index"
                                    class="custom-radio-lable status-lable"
                                    @click="hideToggle"
                                    >{{ status.id.display }}</label>
                                </p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="tbl-wm">
                        <router-link :to="'/admin-jobseeker-list/jobseeker/' + project.id + '/edit'" class="btn btn-info" v-show="project.record_status != 3" >{{ $t('common.edit') }}</router-link>
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
                    <i class="fa fa-angle-right"></i>
                </span>
                </pagination>
            </div>
        </div>

        <!-- Modal content -->
        <!-- <modal ref="modalbox">
            <template #header>
                <h4 class="modal-title">{{$t('jobseekerprofile.basicinfo')}}</h4>
            </template>
            <template #body>
                <div class="row">
                    <div class="col-md-6">{{$t('jobseekerprofile.jobseeker_name')}}</div>
                    <div class="col-md-6">{{basicInfo.jobseeker_name}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.gender')}}</div>
                    <div class="col-md-6">{{basicInfo.gender ? basicInfo.gender : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.date')}}</div>
                    <div class="col-md-6" v-if="basicInfo.dob">{{basicInfo.dob.length > 1 ? basicInfo.dob[0]+'年 '+ basicInfo.dob[1]+'月 '+ basicInfo.dob[2]+'日' : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.Language')}}</div>
                    <div class="col-md-6">{{basicInfo.language_name ? basicInfo.language_name : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.location')}}</div>
                    <div class="col-md-6">{{basicInfo.country_name + ', ' + basicInfo.city_name}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.phone')}}</div>
                    <div class="col-md-6">{{basicInfo.phone ? basicInfo.phone : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.email')}}</div>
                    <div class="col-md-6">{{basicInfo.email ? basicInfo.email : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.skype')}}</div>
                    <div class="col-md-6">{{basicInfo.skype_account ? basicInfo.skype_account : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.education')}}</div>
                    <div class="col-md-6">{{basicInfo.final_education ? basicInfo.final_education : '-'}}</div>
                    <div class="col-md-6">{{$t('jobseekerprofile.status')}}</div>
                    <div class="col-md-6">{{basicInfo.current_situation ? basicInfo.current_situation : '-'}}</div>
                </div>
            </template>
        </modal> -->

    </div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";
//import modal from "../../ModalBox";

export default {
    mixins: [ DataTableServices ],
    //components: { modal },
    data() {
        let sortOrders = {};
        let columns = this.$i18n.messages.en.jobseeker_list.columns;
        columns.forEach((column) => {
            sortOrders[column.label] = -1;
        });
        let filteredData = {
            freeword: "",
            jobseeker_recordstatus: [],
        };
        return {
            basicInfo: {},
            countries: [],
            city_list: [],
            languages: [],
            base_url: "/v1/admin/jobseeker-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            current: null,
            old_index: "",
            status: false,
            arr_status: [
                { id: this.$configs.jobseeker.active, checked: false },
                { id: this.$configs.jobseeker.inactive, checked: false },
                { id: this.$configs.jobseeker.stopped, checked: false },
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
            console.log(status);
            this.$alertService.showConfirmDialog(null, this.$tc('alertMessage.change_confirm_message', status, { n:status }), this.$t("common.yes"), this.$t("common.no")).then((dialogResult) => {
                if (dialogResult.value) {
                    let statusData = {};
                    this.$set(statusData, "id", id);
                    this.$set(statusData, "status", status);
                    this.$api.post(this.base_url + "/change-status", statusData)
                    .then((res) => {
                        console.log(res.data);
                        this.getData(this.projects.current_page);
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
                } else {
                    this.getData(this.projects.current_page);
                }
            });
        },

        /* showBasicInfoModal(id) {
            let request_id = {};
            this.$set(request_id, "id", id);
            this.$api.post("/v1/jobseeker/profile/basicinfo", request_id).then((r) => {
                let response    = r.data.data;
                this.basicInfo  = response.profile;
                this.city_list  = response.cities;
                this.languages  = response.languages;
                this.countries  = response.countries;
                const dob       = new Date(this.basicInfo.dob);
                this.basicInfo.dobyears = dob.getFullYear() + " 年";
                this.basicInfo.dobmonth = dob.getMonth() + 1 + " 月";
                this.basicInfo.dobday   = dob.getDate() + " 日";
                this.$refs.modalbox.showModal();
            });
        }, */
        
        handleStatusToggle(e) {
            let targetClassName = e.target.className;
            // must be Class Names of changing status dropdown
            const statusToggleClasses = [
                "btn btn-common",
                "down-icon",
                "custom-radio-lable status-lable",
                "custion-radio",
            ];
            statusToggleClasses.includes(targetClassName) ? "" : this.hideToggle();
        },

        showToggle(index) {
            this.current = index;
            if (this.status == true) {
                if (this.current == this.old_index) this.status = false;
            } else {
                this.status = true;
            }
            this.old_index = index;
        },

        hideToggle() {
            this.status = false;
        },
    },
};
</script>