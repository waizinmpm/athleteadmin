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
                            <td>{{project.scout_status}} <span class="btn btn-default" @click="editStatus(project.id, project.scout_status)">{{$t('common.edit')}}</span> </td>
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
		<div id="myModal" :class="['modal',requireInvoiceForm ? 'modal-open' : 'modal-close' ]">
			<!-- Modal content -->
			<div class="modal-content">
				<span class="close" @click="requireInvoiceForm = false">&times;</span>
				<div class="container-fluid">
					<div class="row">
						<div class="col-sm-6">
							<h4>仕事</h4>
							<dl class="row">
								<dt class="col-sm-2 text-right">管理番号</dt>
								<dd class="col-sm-9">{{ invoiceForm.management_number }}</dd>
								<dt class="col-sm-2 text-right">タイトル</dt>
								<dd class="col-sm-9">{{ invoiceForm.title }}</dd>
							</dl>
							<h4>請求先企業会員</h4>
							<dl class="row">
								<dt class="col-sm-2 text-right">会員番号</dt>
								<dd class="col-sm-9">{{ invoiceForm.recruiter_number }}</dd>
								<dt class="col-sm-2 text-right">企業名</dt>
								<dd class="col-sm-9">{{ invoiceForm.recruiter_name }}</dd>
							</dl>
							<dl class="row">
								<dt class="col-sm-4">請求書送付先メールアドレス</dt>
								<dd class="col-sm-8">{{ invoiceForm.email }}</dd>
							</dl>
							<h4>仲介手数料</h4>
							<div class="form-group row">
								<div class="col-sm-2"></div>
								<div class="col-sm-6">
									<input type="text" class="form-control text-right" v-model="invoiceForm.default_amount">
								</div>
								<label class="col-sm-1">円</label>
							</div>
							<dl class="row">
								<dt class="col-sm-2 text-right">消費税</dt>
								<dd class="col-sm-6 text-right">{{ Number(invoiceForm.tax).toLocaleString() }}</dd>
								<label class="col-sm-1">円</label>
							</dl>
							<dl class="row">
								<dt class="col-sm-2 text-right">請求金額</dt>
								<dd class="col-sm-6 text-right">{{ Number(invoice_amount).toLocaleString() }}</dd>
								<label class="col-sm-1">円</label>
							</dl>
							<div class="form-group row">
								<label class="col-sm-2 text-right">備考</label>
								<div class="col-sm-6">
									<textarea rows="5" class="form-control"></textarea>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-sm-9 text-right">
									
									<button class="btn btn-primary">請求書プレビュー</button>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<h4>請求書プレビュー</h4>
						</div>
						<div class="col-sm-6">
							<button class="btn btn-danger" style="margin-right: 1rem;" @click="requireInvoiceForm = false">キャンセル</button>
						</div>
					</div>					
				</div>
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
				requireInvoiceForm: false,
                base_url: "/v1/admin/scout-list",
                columns: columns,
                sortOrders: sortOrders,
                
                filteredData:{
					recruiter_id: '',
					title: '',
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
				invoiceForm: {
					scout_id: 0,
					management_number: 0,
					title: 'Sample title',
					recruiter_number: '',
					recruiter_name: '',
					email: '',
					tax: 20000,
					default_amount: 200000,
					invoice_amount: 0,
					remark: '',
				} 
            }
        },
        methods: {
			allowChat(status) {
				return status == this.$configs.scouts.interested || 
					status == this.$configs.scouts.unclaimed ||
					status == this.$configs.scouts.billed;
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
			editStatus(scout_id, scout_status) {
				this.$swal({
					allowOutsideClick: false, 
					title: "Change status",
					width: 500,
					text: null,  
					icon: null,
					confirmButtonColor: "#ffb700",                       
					confirmButtonText: "OK",
					cancelButtonColor: "#0062ff",                       
					cancelButtonText: "Cancel",
					customClass: {
						confirmButton: 'border-style',
						cancelButton: 'cancelbtn border-style',
						input: 'd-flex flex-options',
					},
					showCloseButton: true,
					showCancelButton: true,
					input: 'radio',
					inputOptions: new Promise((resolve) => {
						resolve({
							[this.$configs.scouts.interested]: this.$configs.scouts.interested,
							[this.$configs.scouts.declined]: this.$configs.scouts.declined,
							[this.$configs.scouts.expired]: this.$configs.scouts.expired,
							[this.$configs.scouts.unclaimed]: this.$configs.scouts.unclaimed,
							[this.$configs.scouts.billed]: this.$configs.scouts.billed,
							[this.$configs.scouts.payment_confirmed]: this.$configs.scouts.payment_confirmed,
						})					
					}),
					inputValue: scout_status,
					inputValidator: (value) => {
						if (!value) {
							return 'You need to choose something!'
						}
					}
				})
				.then(r => {
					if (r.isConfirmed) {
						// --Todo access api

						let scout = this.$data.projects.data.find(x => {
							return x.id == scout_id
						});						
						scout.scout_status = r.value;
					}					
				});
			},
			generateBill(scoutId, index) {
				let scout = this.$data.projects.data[index];
				this.invoiceForm.scout_id = scout.id;
				this.invoiceForm.title = scout.title;
				this.invoiceForm.management_number = scout.management_number;
				this.invoiceForm.recruiter_number = scout.recruiter_number;
				this.invoiceForm.recruiter_name = scout.recruiter_name;
				this.invoiceForm.email = scout.recruiter_email;
				this.invoiceForm.default_amount = 200000;
				this.invoiceForm.tax = 20000;
				this.requireInvoiceForm = true;
				//this.$data.projects.data[index].scout_status = this.$configs.scouts.billed;
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
			},
			invoice_amount() {
				return Number(this.invoiceForm.default_amount) + Number(this.invoiceForm.tax);
			}
		},
		
    }
</script>
<style>
.flex-options {
	flex-direction: column;
	align-items: center;
	align-content: space-between;
}
.flex-options label {
	flex: 1 1 0px;
	min-width: 150px;	
	text-align: left;
}

/* The Modal (background) */
.modal {
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-open {
	display: block;
}

.modal-close {
	display: none;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 70px auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
textarea {
	resize: vertical;
}


</style>
