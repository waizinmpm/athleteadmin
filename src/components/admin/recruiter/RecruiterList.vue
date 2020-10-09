<template>
    <div @click="handleStatusToggle">
        <div class="row">
        <div class="col-sm-6 p-0 searchform-one">
            <h5 class="main-header">{{ $t('recruiter_list.recruiter_member_list') }}</h5>
            <div class="form-group p-0">
            <!--<label class="control-label" for="inputGroup">Input Group </label>-->
                <div class="input-group">
                    <!-- <input type="text" class="form-control"
                    placeholder="会社名、企業コードを⼊⼒してください……" id="inputGroup"/>-->
                    <input
                    type="text"
                    class="form-control"
                    :placeholder="[[$t('recruiter_list.recruiterno') ]]"
                    id="inputGroup"
                    v-model="filteredData.freeword"
                    />
                    <span class="input-group-addon bg-color"  @click="getData()">
                        <i class="fa fa-search"></i>
                    </span>
                    <!-- <span class="input-group-addon bg-color searchicon-btn">
                    <i class="fa fa-search pr-2"></i>
                    </span> -->
                </div>
            </div>
            <label for="ステータス">{{ $t('recruiter_list.status') }}</label>
            <div class="row">
            <div class="col-md-12">
                <div class="col-md-2 p-lr0">
                <label for="有効" class="custom-control-label custom-checkbox-label">
                    <input
                    type="checkbox"
                    class="custom-control-input custom-checkbox"
                    value="1"
                    v-model="filteredData.recruiter_recordstatus"
                    @change="getData()"
                    id="有効"
                    />
                    <span class="custom-check-label-post">{{ $t('recruiter_list.valid') }}</span>
                </label>
                </div>
                <div class="col-md-2 p-lr0">
                <label for="無効" class="custom-control-label custom-checkbox-label">
                    <input
                    type="checkbox"
                    class="custom-control-input custom-checkbox"
                    value="2"
                    v-model="filteredData.recruiter_recordstatus"
                    @change="getData()"
                    id="無効"
                    />
                    <span class="custom-check-label-post">{{ $t('recruiter_list.Invalid') }}</span>
                </label>
                </div>
                <div class="col-md-2 p-lr0">
                <label for="退会" class="custom-control-label custom-checkbox-label">
                    <input
                    type="checkbox"
                    class="custom-control-input custom-checkbox"
                    value="0"
                    v-model="filteredData.recruiter_recordstatus"
                    @change="getData()"
                    id="退会"
                    />
                    <span class="custom-check-label-post">{{ $t('recruiter_list.withdrawal') }}</span>
                </label>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div class="row">
        <div class="col-sm-12 p-0">
            <div class="row">
            <div class="col-sm-6 select">
                <div for>{{ $t('common.total_results') }}: {{ $tc('common.item', projects.total, { n:projects.total }) }}</div>
                <span>{{ projects.current_page }}{{ $t('common.displayed_page') }}</span>&nbsp;
                <select v-model="tableData.length" @change="getData()">
                <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                </select>
            </div>
            <div class="col-sm-6 select">
                <span
                class="btn custom-btn float-right"
                @click="deleteData()"
                :disabled="isDisabled"
                >{{ $t('common.delete') }}</span>
            </div>
            </div>
            <div class="vld-parent" style="width: 100%;" ref="loadingRef">
            <DataTable
                ref="datatable"
                class="table-check"
                :columns="$t('recruiter_list.columns')"
                :sortKey="sortKey"
                :sortOrders="sortOrders"
                @check-all="selectAll"
                @sort="sortBy"
                :showCheckbox="true"
            >
                <tbody>
                <tr v-for="(project, index) in projects.data" :key="project.id">
                    <td class="check-col">
                        <label class="form-checkbox">
                            <input type="checkbox" :value="project.id" v-model="selected" />
                            <div v-for="undelete_id in delete_ids_transactions" :key="undelete_id.id" style="color:red;">
                                <!-- {{ undelete_id == project.id ? 'cant delete' : ''}} -->
                                <span v-show="undelete_id == project.id" class="error-msg">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                    </svg>
                                </span>
                            </div>
                        </label>
                    </td>
                    <td><router-link :to="{ name: 'recruiter-detail', params: { id: project.id }}" class="txt-underline">{{project.recruiter_number}}</router-link></td>
                    <td><router-link :to="{ name: 'recruiter-detail', params: { id: project.id }}" class="txt-underline">{{project.recruiter_name}}</router-link></td>
                    <td><router-link :to="{ name: 'recruiter-detail', params: { id: project.id }}" class="txt-underline">{{project.recruiter_nick_name}}</router-link></td>
                    
                    <td class="tbl-wm">
                        <div class="toggle-box">
                            <div v-if="project.record_status != 0" class="scout-box">
                                <router-link :to="{ name: 'recruiter-detail', params: { id: project.id }}" class="txt-underline">
                                    <span class="scout-txt text-center">{{project.record_status == 1 ? '有効' : (project.record_status == 2 ? '停止' : '退会')}}</span>
                                    <!-- <span
                                        v-for="status in arr_status"
                                        :key="status.id.id"
                                    >{{project.record_status == status.id.value ? status.id.display : ''}}</span> -->
                                </router-link><br>
                                <p class="btn btn-common mt-2" v-on:click="showToggle(index)" v-show="project.record_status != 3">
                                    {{$t('common.change')}}
                                    <span class="down-icon">&#9662;</span>
                                </p>
                                <div class="scout-toggle" :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (status == true)}">
                                    <p
                                    class="custom-radio-group mr-3"
                                    v-for="status in arr_status"
                                    :key="status.id.id"
                                    >
                                    <input
                                        type="radio"
                                        :id="status.id.display+index"
                                        v-model="project.record_status"
                                        class="custion-radio"
                                        @change="changeStatus(project.id, status.id.value)"
                                        :value="status.id.value"
                                    />
                                    <label
                                        :for="status.id.display+index"
                                        class="custom-radio-lable status-lable"
                                        @click="hideToggle"
                                    >{{ status.id.display }}</label>
                                    </p>
                                </div>
                            </div>
                            <div v-else>退会</div>
                        </div>
                    </td>
                    <td class="tbl-wm">
                    <router-link
                        :to="'/admin/recruiter-list/' + project.id + '/edit'"
                        class="btn btn-info"
                        v-show="project.record_status != 3"
                    >{{ $t('common.edit')}}</router-link>
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
    </div>
</template>
<script>
import DataTableServices from "../../DataTable/DataTableServices";

export default {
    mixins: [DataTableServices],
    data() {
        let sortOrders = {};

        let columns = this.$i18n.messages.en.recruiter_list.columns;
        columns.forEach((column) => {
            sortOrders[column.label] = -1;
        });
        let filteredData = {
            freeword: "",
            recruiter_recordstatus: [],
        };
        return {
            confirm: "",
            data: "test",
            base_url: "/v1/admin/recruiter-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            current: null,
            old_index: "",
            status: false,
            arr_status: [
                { id: this.$configs.recruiter.active, checked: false },
                { id: this.$configs.recruiter.inactive, checked: false },
                { id: this.$configs.recruiter.stopped, checked: false },
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
        let statusVal = (status == 1? '有効': (status == 2? '停止':'退会'))

        this.$alertService
            .showConfirmDialog(
            null,
            this.$tc('alertMessage.change_confirm_message', statusVal, {
                n: statusVal,
            }),
            this.$t("common.yes"),
            this.$t("common.no")
            )
            .then((dialogResult) => {
                if (dialogResult.value) {
                    let statusData = {};
                    this.$set(statusData, "id", id);
                    this.$set(statusData, "status", status);
                    this.$api
                    .post(this.base_url + `/change-status`, statusData)
                    .then((response) => {
                        console.log("changeStatus", response.data);
                        // let getpage = this.projects.to > this.projects.from ? this.projects.current_page : 1;
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

    mounted() {},
};
</script>