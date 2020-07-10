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
                    <label for="ステータス">{{ $t('common.status') }}</label>
                    <div class="row">
                        <div class="col-md-6">                     
                            <div class="col-md-2 p-lr0" v-for="status in arr_status" v-bind:key="status.id">                          
                                <input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="status.id" :checked="status.checked" v-model="filteredData.scout_status" @change="getData()">
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
                    <div class="col-sm-12 select text-right">
                        <span>検索結果表示件数: {{ totalScouts }}件</span><br>
                        <span>1ページ表示数&nbsp;</span>
                        <select v-model="tableData.length" @change="getData()">
                            <option v-for="(records, index) in perPage" :key="index" :value="records">
                                {{records}}
                            </option>
                        </select>
                    </div>
                </div>
                <DataTable ref="datatable" :columns="$t('scouted_list.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy">
                    <tbody>
                        <tr v-for="(project, index) in projects.data" :key="project.id">
                            <td>{{project.management_number}}</td>
                            <td>{{project.scouted_date}}</td>
                            <td>{{project.recruiter_number}}</td>
                            <td>{{project.recruiter_name}}</td>
                            <td>{{project.job_number}}</td>
                            <td>{{project.title}}</td>
                            <td>{{project.jobseeker_number}}</td>
                            <td>{{project.jobseeker_name}}</td>
                            <td>{{project.scout_status}} <span class="btn btn-default">{{$t('common.edit')}}</span> </td>
                            <td style="width:200px;">
                                <span class="btn btn-default" @click="startChat" v-if="allowChat(project.scout_status)">{{$t('common.chat')}}</span>
                                <span class="btn btn-default" @click="confirmPayment(project.id, index)" v-if="allowPaymentConfirm(project.scout_status)">{{$t('common.payment_confirm')}}</span>
                                <span class="btn btn-default" @click="generateBill(project.id, index)" v-if="allowBilling(project.scout_status)">{{$t('common.invoice_generate')}}</span>
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
                    { id: this.$configs.scouts.interested, checked: false },
                    { id: this.$configs.scouts.expired, checked: false },
                    { id: this.$configs.scouts.declined, checked: false },
                    { id: this.$configs.scouts.unclaimed, checked: false },
                    { id: this.$configs.scouts.billed, checked: false },
                    { id: this.$configs.scouts.payment_confirmed, checked: false }
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
			allowChat(status) {
				return status == this.$configs.scouts.interested;
			},
			allowBilling(status) {
				return status == this.$configs.scouts.unclaimed;
			},
			allowPaymentConfirm(status) {
				return status == this.$configs.scouts.billed;
			},
			startChat() {
				alert("Now will start chatting...");
			},
			generateBill(scoutId, index) {
				alert("Bill is successfully generated...");				
				this.$data.projects.data[index].scout_status = this.$configs.scouts.billed;
			},
			confirmPayment(scoutId, index) {
				if (confirm("Are you sure?")) {
					this.$api.post('/v1/admin/scout-list/confirm-payment', {
						scoutId: scoutId
					})
					.then(() => {
						this.$data.projects.data[index].scout_status = this.$configs.scouts.payment_confirmed;
					})
					.catch(() => {
						alert("操作時にエラーが発生しました。")
					})
					
				}
			}
        },
        computed: {
            totalScouts: function() {
                return this.$data.projects.total;
            }
		}
    }
</script>
