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
                                    @input="getData()"
                                />
                                <span class="input-group-addon bg-color">
                                    <i class="fa fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <label for="ステータス">{{ $t('common.status') }}</label>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-2 p-lr0">
                                <label
                                    for="有効"
                                    class="custom-control-label custom-checkbox-label"
                                >
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
                                <label
                                    for="無効"
                                    class="custom-control-label custom-checkbox-label"
                                >
                                    <input
                                        type="checkbox"
                                        class="custom-control-input custom-checkbox"
                                        value="2"
                                        v-model="filteredData.jobseeker_recordstatus"
                                        @change="getData()"
                                        id="無効"
                                    />
                                    <span class="custom-check-label-post">無効</span>
                                </label>
                            </div>
                            <div class="col-md-2 p-lr0">
                                <label
                                    for="退会"
                                    class="custom-control-label custom-checkbox-label"
                                >
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
                                    </span>
                                </label>
                            </td>
                            <td>{{project.jobseeker_number}}</td>
                            <td>{{project.jobseeker_name}}</td>
                            <td>{{project.record_status == 1 ? '有効' : (project.record_status == 0 ? '退会' : '無効')}}</td>
                            <td style="width:20%;">
                                <div class="toggle" v-if="project.record_status != 0">
                                    
                                    <!-- <span class="checkbox">
                                        <input
                                            type="checkbox"
                                            :id="project.id"
                                            v-if="project.record_status == 1"
                                            @click="changeStatus(project.id,project.record_status)"
                                            checked
                                        />
                                        <input
                                            type="checkbox"
                                            :id="project.id"
                                            v-if="project.record_status == 2"
                                            @click="changeStatus(project.id,project.record_status)"
                                        />
                                        <label for="checkbox"></label>
                                        <span v-if="project.record_status == 1" class="on">有効</span>
                                        <span v-if="project.record_status == 2" class="on">無効</span>
                                    </span> -->
                                    <div class="scout-box">
                                        <button @click="edit(project.id)" class="btn btn-info">{{ $t('common.edit') }}</button>
                                        <span class="scout-txt text-center">{{project.record_status == 1 ? '有効' : '無効'}} </span>
                                        <span class="btn btn-common" v-on:click="showToggle(index)">
                                            {{$t('common.edit')}}
                                            <span class="down-icon">&#9662;</span>
                                        </span>
                                        <div class="scout-toggle"  :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (status == true)}">
                                            <p class="custom-radio-group mr-3"  v-for="status in arr_status" v-bind:key="status.id">
                                                <input type="radio" :id="status.id+index" v-model="project.record_status" class="custion-radio" 
                                                    @change="changeStatus(project.id, status.id)" :value="status.id == '有効' ? 1 : 2">
                                                <label :for="status.id+index" class="custom-radio-lable status-lable" @click="hideToggle">{{ status.id }}</label>
                                            </p>
                                        </div>
                                    
                                    </div>
                                </div>
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
    </div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";

export default {
    mixins: [DataTableServices],
    data() {
        let sortOrders = {};
        let columns = this.$i18n.messages.en.jobseeker_list.columns;
        columns.forEach(column => {
            sortOrders[column.label] = -1;
        });
        /* let columns = [
            { label: "jobseekerlist.jobseeker_number", name: "custom_id" },
            { label: "jobseekerlist.jobseeker_name", name: "jobseeker_name" },
            { label: "common.status", name: "status" },
            { label: "", name: "status_button" }
        ]; */
        columns.forEach(column => {
            sortOrders[column.name] = -1;
        });
        let filteredData = {
            freeword: "",
            jobseeker_recordstatus: []
        };
        return {
            base_url: "/v1/admin/jobseeker-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            current: null,
            old_index:'',
            status:false,
            arr_status: [
				{ id: '有効', checked: false },
				{ id: '無効', checked: false }
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

        changeStatus(id, recordstatus) {
            this.recordstatus_text = recordstatus == '有効' ? "無効にしてよろしいでしょうか。" : "有効してよろしいでしょうか。";
            this.$alertService
            .showConfirmDialog(null, this.$t('dialog_box.confirm_change_message'), this.$t('common.yes'), this.$t('common.no'))
            .then((dialogResult) => {
                if(dialogResult.value){
                    this.$api.post(this.base_url + `/change-status/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        this.getData(this.projects.current_page);
                    });
                }else{
                    this.getData(this.projects.current_page);
                }
            });
        },

        edit(id){
            alert("jobseeker id -> "+ id);
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