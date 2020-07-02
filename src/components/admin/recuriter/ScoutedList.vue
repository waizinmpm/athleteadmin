<template>
    <div>   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('scouted_list.title') }}</h5>   
                <div class="content-row" style="padding-bottom:0px;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="企業番号">{{ $t('common.recruiter_id') }}</label>
                            <input type="text" placeholder="企業番号" class="form-control" v-model.trim="filteredData.recruiter_id">
                        </div>
                        <div class="col-md-3">
                            <label for="企業名">{{ $t('common.recruiter_name') }}</label>
                            <input type="text" placeholder="企業名" class="form-control" v-model.trim="filteredData.recruiter_name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="求人番号">{{ $t('common.job_number') }}</label>
                            <input type="text" placeholder="求人番号" class="form-control" v-model.trim="filteredData.job_number">
                        </div>
                        <div class="col-md-3">
                            <label for="求人タイトル">{{ $t('common.job_title') }}</label>
                            <input type="text" placeholder="求人タイトル" class="form-control" v-model.trim="filteredData.job_title">
                        </div>
                        <div class="col-md-3">
                            <label for="アスリート会員氏名">{{ $t('common.jobseeker_name') }}</label>
                            <input type="text" placeholder="アスリート会員氏名" class="form-control" v-model.trim="filteredData.jobseeker_name">
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-md-3 datepicker-wrapper">
                            <label for="スカウト日時">{{ $t('scouted_list.scout_date') }}</label>
                            <date-picker v-model="filteredData.from_date" valueType="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>                  
                        </div>  
                        <div class="col-md-3 datepicker-wrapper">
                            <label for=""></label>
                            <date-picker v-model="filteredData.to_date" valueType="format" class="datepicker" :lang="lang"  placeholder="年 - 月 - 日"></date-picker> 
                        </div>                     
                        <div class="col-md-3">                        
                            <button class="btn searchbtn" style="margin-top:22px;" @click="getData()">{{ $t('common.search') }}</button>
                        </div>                
                    </div>
                    <!-- Search by Status -->
                    <label for="ステータス">{{ $t('scouted_list.scout_status') }}</label>
                    <div class="row">
                        <div class="col-md-6">                     
                            <div class="col-md-2 p-lr0" v-for="status in arr_status" v-bind:key="status.id">                          
                                <input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="status.id" :checked="status.checked" v-model="filteredData.scout_status">
                                <label class="custom-control-label custom-checkbox-label">{{status.id}}</label>                          
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
                        <select v-model="tableData.length" @change="getData()">
                            <option v-for="(records, index) in perPage" :key="index" :value="records">
                                {{records}}
                            </option>
                        </select>
                    </div>
                </div>
                <DataTable ref="datatable" :columns="$t('scouted_list.columns')" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
                    <tbody>
                        <tr v-for="project in projects.data" :key="project.id">
                            <td><input type="checkbox"></td>
                            <td>{{project.scouted_date}}</td>
                            <td>{{project.recruiter_id}}</td>
                            <td>{{project.recruiter_name}}</td>
                            <td>{{project.job_number}}</td>
                            <td>{{project.title}}</td>
                            <td>{{project.jobseeker_id}}</td>
                            <td>{{project.jobseeker_name}}</td>
                            <td>{{project.scout_status}} <span class="btn btn-default">{{$t('common.edit')}}</span> </td>
                            <td style="width:200px;">
                                <!-- <span class="btn btn-default">{{$t('common.chat')}}</span>
                                <span class="btn btn-default">{{$t('common.payment_confirm')}}</span>
                                <span class="btn btn-default">{{$t('common.invoice_generate')}}</span> -->
                                <!-- <div class="toggle" v-if="project.recordstatus != 0">
                                    <span class="checkbox">
                                        <input
                                            type="checkbox"
                                            :id="project.id"
                                            v-if="project.recordstatus == 1"
                                            @click="changeStatus(project.id,project.recordstatus)"
                                            checked
                                        />
                                        <input
                                            type="checkbox"
                                            :id="project.id"
                                            v-if="project.recordstatus == 2"
                                            @click="changeStatus(project.id,project.recordstatus)"
                                        />
                                        <label for="checkbox"></label>
                                        <span v-if="project.recordstatus == 1" class="on">有効</span>
                                        <span v-if="project.recordstatus == 2" class="on">無効</span>
                                    </span>
                                </div> -->
                            </td>
                        </tr>
                    </tbody>
                </DataTable>
                <pagination v-if="projects.length != 0" :data="projects" @pagination-change-page="getData" :limit="limitpc">
                    <span slot="prev-nav">
                        <i class="fas fa-angle-left"></i> 前へ
                    </span>
                    <span slot="next-nav">
                        次へ <i class="fas fa-angle-right"></i>
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
        data(){
            let sortOrders = {};
            let columns = [];
            columns.forEach(column => {
                sortOrders[column.name] = -1;
            });
            return {
                base_url: "/v1/admin/scout-list",
                columns: columns,
                sortOrders: sortOrders,
                
                filteredData:{
                    recruiter_id: '',
                    recruiter_name: '',
                    from_date: '',
                    to_date:'',
                    job_number: '',
                    job_title: '',
                    jobseeker_name: '',
                    scout_status: [],
                },
              
                arr_status: [
                    { id: '興味あり', checked: false },
                    { id: '期限切れ', checked: false },
                    { id: '不採用/辞退', checked: false },
                    { id: '内定未請求', checked: false },
                    { id: '請求済', checked: false },
                    { id: '入金確認済', checked: false }
                ],
                lang:{
                    days: ['日', '月', '火', '水', '木', '金', '土'],
                    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    placeholder: {
                        date: '年 - 月 - 日',
                    }
                },   
            }
        },
        methods: {
        
        }
    }
</script>
