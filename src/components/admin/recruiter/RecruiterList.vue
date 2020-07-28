<template>    
<div>
    <div class="row">
        <div class="col-sm-6 p-0 searchform-one">
            <h5 class="m-b-10 main-header">企業会員情報一覧</h5>     
            <div class="form-group">
                <!--<label class="control-label" for="inputGroup">Input Group </label>-->
                <div class="input-group">
                    <!-- <input type="text" class="form-control"
                        placeholder="会社名、企業コードを⼊⼒してください……" id="inputGroup"/> -->
                        <input
                                    type="text"
                                    class="form-control"
                                    placeholder="会社名、企業コードを⼊⼒してください……"
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
    </div>
    <div class="row">
        <div class="col-sm-12 p-0">
            <div class="row">
                <div class="col-sm-6 select">
                    <select v-model="tableData.length" @change="getData()">
                        <option
                            v-for="(records, index) in perPage"
                            :key="index"
                            :value="records"
                        >{{records}}</option>
                    </select>
                </div>
                <div class="col-sm-6 select">
                    <span class="btn custom-btn delete" style="float:right" @click="deleteData()">削除</span>
                </div>
            </div> 
            <div class="vld-parent" style="width: 100%;" ref="loadingRef"> 
                <DataTable ref="datatable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @check-all="selectAll" @sort="sortBy" :showCheckbox="true">
                    <tbody>
                        <tr v-for="project in projects.data" :key="project.id"> 
                            <td>
                                <label class="form-checkbox">
                                    <input type="checkbox" :value="project.id" v-model="selected" />
                                </label>
                            </td>
                            <td>{{project.recruiter_number}}</td>
                            <td>{{project.recruiter_name}}</td>
                            <td>{{project.recruiter_nick_name}}</td>
                            <td>{{project.record_status == 1 ? '有効' : project.record_status == 0 ? '退会' : '無効'}}</td>
                            <td style="width:200px;">
                                <span class="btn btn-info">編集</span>
                                <div class="toggle" v-if="project.record_status != 0">
                                    <span class="checkbox">
                                        <input type='checkbox' :id="project.id" v-if="project.record_status == 1" @click="changeStatus(project.id,project.record_status)" checked/>
                                        <input type='checkbox' :id="project.id" v-if="project.record_status == 2" @click="changeStatus(project.id,project.record_status)"  />
                                        <label for="checkbox"></label>
                                        <span  v-if="project.record_status == 1" class="on">有効</span>
                                        <span v-if="project.record_status == 2" class="on">無効</span>
                                    </span>
                                </div> 
                            </td>
                        </tr>
                    </tbody>       
                </DataTable>
            </div>
            <pagination v-if="projects.length != 0" :data="projects" @pagination-change-page="getData" :limit="limitpc" >
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
            {label: "求職者会員番号", name: "recruiter_number" },
            {label: "求職者名", name: "recruiter_name" },
            {label: "会社名(愛称)", name: "recruiter_nick_name"},
            {label: "ステータス", name: "recruiter_recordstatus" },
            {label: "", name: "status_button" }
        ];
        columns.forEach(column => {
            sortOrders[column.name] = -1;
        }); 
        let filteredData = {
            freeword: "",
            recruiter_recordstatus: []
        };
        return {
            base_url: "/v1/admin/recruiter-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData
        };
    },
    methods: {
    },
    mounted() {
    },
};
</script>