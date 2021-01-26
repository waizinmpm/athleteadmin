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
                        
                        <span class="input-group-addon bg-primary"  @click="getData()">
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                    </div>
                </div>

                <label for="ステータス">
                    {{ $t('common.status') }}
                    <!--status click-->                    
                    <span @click="visible = !visible" ref="tooltip-box" style="cursor:pointer">                   
                        <svg x="0px" y="0px" viewBox="0 0 512 512" style="width: 15px; height: 15px; opacity: 1;"><g>
                        <path class="st0" d="M256,0C114.616,0,0,114.612,0,256s114.616,256,256,256s256-114.612,256-256S397.385,0,256,0z M207.678,378.794
                        c0-17.612,14.281-31.893,31.893-31.893c17.599,0,31.88,14.281,31.88,31.893c0,17.595-14.281,31.884-31.88,31.884
                        C221.959,410.678,207.678,396.389,207.678,378.794z M343.625,218.852c-3.596,9.793-8.802,18.289-14.695,25.356
                        c-11.847,14.148-25.888,22.718-37.442,29.041c-7.719,4.174-14.533,7.389-18.769,9.769c-2.905,1.604-4.479,2.95-5.256,3.826
                        c-0.768,0.926-1.029,1.306-1.496,2.826c-0.273,1.009-0.558,2.612-0.558,5.091c0,6.868,0,12.512,0,12.512
                        c0,6.472-5.248,11.728-11.723,11.728h-28.252c-6.475,0-11.732-5.256-11.732-11.728c0,0,0-5.645,0-12.512
                        c0-6.438,0.752-12.744,2.405-18.777c1.636-6.008,4.215-11.718,7.508-16.694c6.599-10.083,15.542-16.802,23.984-21.48
                        c7.401-4.074,14.723-7.455,21.516-11.281c6.789-3.793,12.843-7.91,17.302-12.372c2.988-2.975,5.31-6.05,7.087-9.52
                        c2.335-4.628,3.955-10.067,3.992-18.389c0.012-2.463-0.698-5.702-2.632-9.405c-1.926-3.686-5.066-7.694-9.264-11.29
                        c-8.45-7.248-20.843-12.545-35.054-12.521c-16.285,0.058-27.186,3.876-35.587,8.62c-8.36,4.776-11.029,9.595-11.029,9.595
                        c-4.268,3.718-10.603,3.85-15.025,0.314l-21.71-17.397c-2.719-2.173-4.322-5.438-4.396-8.926c-0.063-3.479,1.425-6.81,4.061-9.099
                        c0,0,6.765-10.43,22.451-19.38c15.62-8.992,36.322-15.488,61.236-15.429c20.215,0,38.839,5.562,54.268,14.661
                        c15.434,9.148,27.897,21.744,35.851,36.876c5.281,10.074,8.525,21.43,8.533,33.38C349.211,198.042,347.248,209.058,343.625,218.852
                        z" style="fill: rgb(145 145 145);"></path>
                        </g>
                        </svg>                  
                    </span>
                    <span class="bg" v-if="visible" @click="visible=!visible"></span>
                    <span class="tooltip-box" v-if="visible">
                        <table class="tooltiptext">
                            <thead>
                                <tr><th colspan="2" class="tooltip-head">ステータスの説明</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="w-105">有効</td><td>有効な会員</td></tr>
                                <tr><td class="w-105">停止</td><td>一時的にアカウントの利用を停止している会員</td></tr>
                                <tr><td class="w-105">退会</td><td>退会した会員</td></tr>
                            </tbody>
                        </table>
                    </span>                    
                    <!-- end status click -->
                </label>
                <div class="status-row">
                    <div class="status-col" v-for="status in arr_status" :key="status.id.value">
                        <label :for="status.id.display" class="custom-control-label custom-checkbox-label">
                        <input
                            type="checkbox"
                            class="custom-control-input custom-checkbox"
                            :value="status.id.value"
                            v-model="filteredData.jobseeker_recordstatus"
                            @change="getData()"
                            :id="status.id.display"
                        />
                        <span class="custom-check-label-post">{{status.id.display}}</span>
                        </label>
                    </div>
                    <!-- <div class="status-col">
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
                    <div class="status-col">
                        <label for="退会" class="custom-control-label custom-checkbox-label">
                        <input
                            type="checkbox"
                            class="custom-control-input custom-checkbox"
                            value="3"
                            v-model="filteredData.jobseeker_recordstatus"
                            @change="getData()"
                            id="退会"
                        />
                        <span class="custom-check-label-post">退会</span>
                        </label>
                    </div> -->
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
                <!-- <div class="col-sm-6">
                    <button
                    class="btn custom-btn float-right"
                    :disabled="isDisabled"
                    @click="deleteData()"
                    >{{ $t('common.delete') }}</button>
                </div> -->
                </div>
                <div class="vld-parent" style="width: 100%;" ref="loadingRef">
                    <DataTable
                        ref="datatable"
                        :columns="$t('jobseeker_list.columns')"
                        :sortKey="sortKey"
                        :sortOrders="sortOrders"
                        @check-all="selectAll"
                        @sort="sortBy"
                        :showCheckbox="true"
                        :totalLength = projects.total
                        :hasSearched="hasSearched"
                    >
                    <tbody>
                        <tr v-for="(project, index) in projects.data" :key="project.id">
                        <!-- <td class="check-col">
                            <label class="form-checkbox">
                            <span v-if="project.record_status != 0">
                                <input type="checkbox" :value="project.id" v-model="selected" />
                                <div v-for="undelete_id in delete_ids_transactions" :key="undelete_id.id" style="color:red;">
                                    <span v-show="undelete_id == project.id && project.record_status != 3"  class="error-msg">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                        </svg>
                                    </span>
                                </div>
                            </span>
                            </label>
                        </td> -->
                        <td class="tbl-wl">
                            <span @click="jobseekerDetail(project.id)" class="detail-link">
                                {{project.jobseeker_number}}
                            </span>
                            <!-- <router-link :to="{ name: 'jobseeker-detail', params: { id: project.id }}">{{project.jobseeker_number}}</router-link> -->
                        </td>
                        <td class="text-left">
                            <div class="d-flex mr-3">
                                <span  class="detail-link" @click="jobseekerDetail(project.id)">{{project.jobseeker_name}}</span>
                                <div class="ml-auto">
                                    <span v-if="project.login_locked" class="still-lock-label"><i class="fa fa-lock pr-2" aria-hidden="true"></i>ロック中</span>
                                    <button type="button" v-if="project.login_locked" class="btn btn-info" @click="clearLoginLocked(project.email)">ロック解除</button>
                                </div>
                            </div>
                            <!-- <router-link :to="{ name: 'jobseeker-detail', params: { id: project.id }}">{{project.jobseeker_name}}</router-link> -->
                        </td>
                        <td class="tbl-wmail">
                            <span @click="jobseekerDetail(project.id)" class="detail-link">
                                {{project.email}}
                            </span>
                        </td>
                        <td class="tbl-ws">
                            <div class="toggle-box" v-if="project.record_status != 0">
                                <div class="scout-box">
                                    <p class="scout-txt text-center">{{project.record_status == 1 ? '有効' : (project.record_status == 2 ? '停止' : '退会')}}</p>
                                    <p class="btn btn-common" v-on:click="showToggle(index)" v-if="project.record_status != 3">
                                        {{$t('common.change')}}
                                        <span class="down-icon">&#9662;</span>
                                    </p>
                                    <div class="scout-toggle" :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (status == true)}">
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
                        <td class="tbl-ws">
                            <button type="button" class="btn btn-edit" @click="jobseekerEdit(project.id)" v-if="project.record_status != 3">{{ $t('common.edit')}}</button>
                            <!-- <router-link :to="'/admin-jobseeker-list/jobseeker/' + project.id + '/edit'" class="btn btn-info" v-if="project.record_status != 3" >{{ $t('common.edit') }}</router-link> -->
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
                    <i class="fa fa-angle-left"></i> 前へ
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
            visible: false,
            paging : {
                page: 'jobseeker-list',
                page_no: 1,
                length : 5,
            }
        };
    },
    mounted(){
        if (!window.socket.connected) {
            window.socket.connect()
        }
    },
    computed: {
        isDisabled() {
            //if dont select any row, set disable delete button
            return this.selected.length > 0 ? false : true;
        },
    },

    methods: {
        changeStatus(id, status) {
            let changed_status = status == 1 ? this.$configs.jobseeker.active.display : (status == 2 ? this.$configs.jobseeker.inactive.display :  this.$configs.jobseeker.stopped.display);
            console.log(changed_status);
            this.$alertService.showConfirmDialog(null, this.$tc('alertMessage.change_confirm_message', changed_status, { n:changed_status }), this.$t("common.yes"), this.$t("common.no")).then((dialogResult) => {
                if (dialogResult.value) {
                    let statusData = {};
                    this.$set(statusData, "id", id);
                    this.$set(statusData, "status", status);
                    this.$api.post(this.base_url + "/change-status", statusData)
                    .then((res) => {
                        console.log(res.data);
                        this.getData(this.projects.current_page);
                        window.socket.emit("deactived", [id,'jobseeker']);
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
                } else {
                    this.getData(this.projects.current_page);
                }
            });
        },

        jobseekerEdit(id){
            this.paging.page_no = this.projects.current_page;
            this.paging.length = this.tableData.length;
            this.$store.commit('setPaging',this.paging);
            this.$router.push({ path: "/admin-jobseeker-list/jobseeker/" + id + "/edit" });
        },

        jobseekerDetail(id){
            this.paging.page_no = this.projects.current_page;
            this.paging.length = this.tableData.length;
            this.$store.commit('setPaging',this.paging);
            this.$router.push({ name: 'jobseeker-detail', params: { id: id }});
        },

        clearLoginLocked(email){
            this.$alertService.showConfirmDialog(null, "ロックを解除しますか。", this.$t("common.yes"), this.$t("common.no")).then((dialogResult) => {
                if (dialogResult.value) {
                    let user_data = {};
                    this.$set(user_data, "email", email);
                    this.$set(user_data, "role_id", 3);
                    this.$api.post("/v1/admin/login-unlock", user_data)
                    .then((res) => {
                        console.log(res.data.data ? "Unlock this account" : "This account was not locked");
                    })
                    .catch((errors) => {
                        console.log(errors);
                    });
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
<style  scoped>
/* tooltip for status */
.tooltip {
    width: 500px;
    background-color: #5cb1ab;
    color: #fff;   
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
}
.tooltip-box .tooltiptext {     
    visibility: visible;
    background-color: rgba(94,94,99,1);
    color: #fff;
    text-align: center;
    word-break: break-word;
    border: 1px solid #363030ee;
    border-radius: 5px;
    padding: 20px;
    position: absolute;
    z-index: 33;
    bottom: 20%;
    opacity: 0.9;
    min-width: 517px;
    text-align: left;
    margin-left: 0px;
}
.tooltip-box .tooltiptext::after{
    display: none;
}
.tooltip-box table{
    border-collapse: initial !important;
}
.tooltip-box table tr{
    vertical-align: top;
    background: none !important;
}
.tooltip-head{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 10px;
}
.w-105{
    width: 105px;
}
.bg {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  transition: .3s;
}
.tbl-wmail {
    width: 200px;
}
.still-lock-label {
    font-weight: bold; 
    margin-right: 5px;    
    color: #fa1313; 
    padding: 6px 8px; 
    vertical-align: middle;
}
</style>