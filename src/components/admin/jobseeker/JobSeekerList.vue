<template>
    <div>
        <div class="row">
            <div class="col-sm-6 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">求職者会員情報一覧</h5>
                <div class="content-row" style="padding-bottom:0px;margin-left:0px;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="求職者会員番号、求職者名を⼊⼒してください……"
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

                    <label for="ステータス">ステータス</label>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="col-md-2 p-lr0">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    value="1"
                                    v-model="filteredData.jobseeker_recordstatus"
                                    @change="getData()"
                                    id="有効"
                                />
                                <label
                                    for="有効"
                                    class="custom-control-label custom-checkbox-label"
                                >有効</label>
                            </div>
                            <div class="col-md-2 p-lr0">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    value="2"
                                    v-model="filteredData.jobseeker_recordstatus"
                                    @change="getData()"
                                    id="無効"
                                />
                                <label
                                    for="無効"
                                    class="custom-control-label custom-checkbox-label"
                                >無効</label>
                            </div>
                            <div class="col-md-2 p-lr0">
                                <input
                                    type="checkbox"
                                    class="custom-control-input custom-checkbox"
                                    value="0"
                                    v-model="filteredData.jobseeker_recordstatus"
                                    @change="getData()"
                                    id="退会"
                                />
                                <label
                                    for="退会"
                                    class="custom-control-label custom-checkbox-label"
                                >退会</label>
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
                        >削除</span>
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
                                    <button @click="edit(project.id)" class="btn btn-info">編集</button>
                                    &nbsp;
                                    <span class="checkbox">
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
                                    </span>
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
        let columns = [
            { label: "求職者会員番号", name: "custom_id" },
            { label: "求職者名", name: "jobseeker_name" },
            { label: "ステータス", name: "status" },
            { label: "", name: "status_button" }
        ];
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
            filteredData: filteredData
        };
    },
    methods: {
        changeStatus(id, recordstatus) {
            if (recordstatus == 1) {
                this.recordstatus_text = "無効にしてよろしいでしょうか。";
            } else {
                this.recordstatus_text = "有効してよろしいでしょうか。";
            }

            this.$api.post(this.base_url + `/change-status/${id}`)
            .then((res) => {
                console.log(res);
                this.getData();
            });
            // this.$swal({
            //     allowOutsideClick: false,
            //     text: this.recordstatus_text,
            //     type: "warning",
            //     width: 350,
            //     height: 200,
            //     showCancelButton: true,
            //     confirmButtonColor: "#eea025",
            //     cancelButtonColor: "#b1abab",
            //     cancelButtonTextColor: "#000",
            //     confirmButtonText: "はい",
            //     cancelButtonText: "キャンセル",
            //     confirmButtonClass: "all-btn",
            //     cancelButtonClass: "all-btn"
            // }).then(()=> {
            //     this.$api
            //     .post(this.base_url + `/change-status/${id}`)
            //     .then(() => {
            //             this.getData();
            //     });

            // })
            // .catch(error =>{
            //     if(recordstatus == 1){
            //         $("#"+id).prop("checked", true);
            //     }else{
            //         $("#"+id).prop("checked", false);
            //     }
            // });
        },
        edit(id){
            alert("jobseeker id -> "+ id);
        }
    },
    mounted() {}
};
</script>