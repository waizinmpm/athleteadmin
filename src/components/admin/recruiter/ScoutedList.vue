<template>
    <div>   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('scouted_list.title') }}</h5>   
                <div class="content-row" style="padding-bottom:0px;">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="企業番号">{{ $t('common.recruiter_number') }}</label>
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
                            <label for="アスリート会員氏名">{{ $t('common.jobseeker_number') }}</label>
                            <input type="text" placeholder="アスリート会員氏名" class="form-control" v-model.trim="filteredData.jobseeker_number">
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
                        <span>{{ $t('common.total_results') }}: {{ $tc('common.item', totalScouts, { n:totalScouts }) }}</span><br>
                        <span>1 {{ $t('common.displayed_page') }}&nbsp;</span>
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
                            <td>{{project.scouted_date| date('%Y-%m-%d')}}</td>
                            <td>{{project.recruiter_number}}</td>
                            <td>{{project.recruiter_name}}</td>
                            <td>{{project.job_number}}</td>
                            <td>{{project.title}}</td>
                            <td>{{project.jobseeker_number}}</td>
                            <td>{{project.jobseeker_name}}</td>
                            <td>
                                <div class="scout-box">
                                    <p class="scout-txt">{{project.scout_status}} </p>
                                     <p class="btn btn-common" v-on:click="showToggle(index)">
                                        {{$t('common.edit')}}
                                        <span class="down-icon">&#9662;</span>
                                    </p>
                                    <div class="scout-toggle"  :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (status == true)}">
                                        <p class="custom-radio-group mr-3"  v-for="status in arr_status" v-bind:key="status.id">
                                            <input type="radio" :id="status.id+index" v-model="project.scout_status" class="custion-radio" 
												@change="onStatusChange(index, $event)" :value="status.id">
                                            <label :for="status.id+index" class="custom-radio-lable status-lable" @click="hideToggle">{{ status.id }}</label>
                                        </p>
                                    </div>
                                   
                                </div>
                            </td>
                            <td style="width:200px;">
                                <span class="btn btn-default" @click="startChat" v-if="allowChat(project.scout_status)">{{$t('common.chat')}}</span>
                                <span class="btn btn-default" @click="confirmPayment(project.id, index)" v-if="allowPaymentConfirm(project.scout_status)">{{$t('common.payment_confirm')}}</span>
                                <span class="btn btn-default" @click="generateBill(project.id, index)" v-if="allowBilling(project.scout_status)">{{$t('common.invoice_generate')}}</span>
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
			<!-- Modal content -->
		<div id="myModal" :class="['modal',requireInvoiceForm ? 'modal-open' : 'modal-close' ]">
			<div class="modal-content">
				<span class="close" @click="closeInvoiceModal">&times;</span>
				<div class="container-fluid vld-parent" ref="invoicePreviewContainer">
					<div class="row">
						<div class="col-sm-6">
							<div class="border">
								<h4>{{ $t('common.job') }}</h4>
								<dl class="row">
									<dt class="col-sm-2 text-right">{{ $t('scouted_list.columns.0.name') }}</dt>
									<dd class="col-sm-9">{{ invoiceForm.management_number }}</dd>
									<dt class="col-sm-2 text-right">{{ $t('scouted_list.columns.5.name') }}</dt>
									<dd class="col-sm-9">{{ invoiceForm.title }}</dd>
								</dl>
								<h4>{{ $t('common.billing_recruiter') }}</h4>
								<dl class="row">
									<dt class="col-sm-2 text-right">{{ $t('scouted_list.columns.2.name') }}</dt>
									<dd class="col-sm-9">{{ invoiceForm.recruiter_number }}</dd>
									<dt class="col-sm-2 text-right">{{ $t('scouted_list.columns.3.name') }}</dt>
									<dd class="col-sm-9">{{ invoiceForm.recruiter_name }}</dd>
								</dl>
							</div>		
							<div class="border">
								<dl class="row email-box">									
									<dt class="col-sm-4">{{ $t('common.billing_mail') }}</dt>
									<dd class="col-sm-8">{{ invoiceForm.email }}</dd>
								</dl>
							</div>
							<div class="border">
							<h4>{{ $t('common.brokerage_fee') }}</h4>
							<div class="form-group row">
								<div class="col-sm-2"></div>
								<div class="col-sm-6">
									<input type="text" :class="['form-control text-right', $v.invoiceForm.default_amount.$error ? 'is-invalid' :'']" v-model="$v.invoiceForm.default_amount.$model">
									<div class="invalid-feedback">
										<div class="error" v-if="!$v.invoiceForm.default_amount.required">入力されていません</div>
										<div class="error" v-if="!$v.invoiceForm.default_amount.numeric">電話番号は数字のみである必須があります</div>
									</div>
								</div>
								<label class="col-sm-1">円</label>
							</div>
							<dl class="row">
								<dt class="col-sm-2 text-right">{{ $t('common.tax') }}</dt>
								<dd class="col-sm-6 text-right">{{ Number(invoiceForm.tax).toLocaleString() }}</dd>
								<label class="col-sm-1">円</label>
							</dl>
							<dl class="row">
								<dt class="col-sm-2 text-right">{{ $t('common.invoice_amount') }}</dt>
								<dd class="col-sm-6 text-right">{{ Number(invoiceForm.invoice_amount).toLocaleString() }}</dd>
								<label class="col-sm-1">円</label>
							</dl>
							<div class="form-group row">
								<label class="col-sm-2 text-right">{{ $t('common.remark') }}</label>
								<div class="col-sm-6">
									<textarea rows="5" class="form-control" v-model="invoiceForm.remark"></textarea>
								</div>
							</div>
							<div class="form-group row">
								<div class="col-sm-9 text-right">
									<button class="btn btn-primary" @click="loadInvoicePreview">{{ $t('common.invoice_preview') }}</button>
								</div>
							</div>
							</div>
						</div>
						<div class="col-sm-6" v-if="invoicePreview">
							<h4>{{ $t('common.invoice_preview') }}</h4>
							<div class="invoice-preview-area">
								<iframe v-bind:srcdoc="invoicePreview" frameborder="1" style="width: 100%; height: 60vh;"></iframe>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6">
							<button class="btn btn-primary" style="margin-right: 1rem;" @click="closeInvoicePreview">{{ $t('common.back') }}</button>
							<button class="btn btn-danger" style="margin-right: 1rem;" @click="closeInvoiceModal">{{ $t('common.cancel') }}</button>
						</div>
						<div class="col-sm-6 text-right">
							<button class="btn btn-primary" style="margin-right: 1rem;" @click="sendInvoiceMail" v-show="invoicePreview">{{ $t('common.send_invoice') }}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";
import { required, numeric } from "vuelidate/lib/validators";

export default {
	mixins: [DataTableServices],
	data(){
		let sortOrders = {};
        let columns = this.$i18n.messages.en.scouted_list.columns;
            columns.forEach(column => {
            sortOrders[column.label] = -1;
        });
		return {
			requireInvoiceForm: false,
			invoicePreview: '',
			old_index:'',
			status:false,
			current: null,
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
				jobseeker_number:'',
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
				title: '',
				recruiter_number: '',
				recruiter_name: '',
				email: '',
				tax: 20000,
				default_amount: 200000,
				invoice_amount: 220000,
				remark: '',
			},
			isToggle : false ,
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
		onStatusChange(index, e) {
			const scout = this.$data.projects.data[index];
			this.$alertService.showConfirmDialog(null, this.$t('dialog_box.confirm_change_message'), this.$t('common.yes'), this.$t('common.no')) 
			.then(r => {
				if (r.value) {
					this.$api.post('/v1/admin/scout-list/change-status', { 
						scout_id: scout.id, 
						status: e.target.value,
					})
					.then(res => {
						console.log("changeStatus", res.data);
                        this.getData(this.projects.current_page);
					})
					.catch(() => {
					})
				}
				else {
                    this.getData(this.projects.current_page);
                }
			});
		},
		generateBill(scoutId, index) {
            // --Set form default value
			let scout = this.$data.projects.data[index];
			this.invoiceForm.scout_id = scout.id;
			this.invoiceForm.title = scout.title;
			this.invoiceForm.management_number = scout.management_number;
			this.invoiceForm.recruiter_number = scout.recruiter_number;
			this.invoiceForm.recruiter_name = scout.recruiter_name;
			this.invoiceForm.email = scout.recruiter_email;
			this.invoiceForm.default_amount = 200000;
			this.requireInvoiceForm = true;
		},
		closeInvoiceModal() {
			// --close any preview
			this.closeInvoicePreview();
			// --reset invoice form data
			this.invoiceForm = {
				scout_id: 0,
				management_number: 0,
				title: '',
				recruiter_number: '',
				recruiter_name: '',
				email: '',
				tax: 20000,
				default_amount: 200000,
				invoice_amount: 220000,
				remark: '',
			};
			// --close modal
			this.requireInvoiceForm = false; 
		},
		loadInvoicePreview() {
			this.$v.invoiceForm.$touch();
			if (this.$v.invoiceForm.$invalid) {
				return;
			}
			this.$api.post('/v1/admin/scout-list/generate-bill', this.invoiceForm)
			.then((r) => {
				let html = r.data;
				this.invoicePreview = html;
			})
			.catch(() => {
				
			})
		},
		closeInvoicePreview() {
			this.invoicePreview = null;
		},
		sendInvoiceMail() {
			this.$v.invoiceForm.$touch();
			if (this.$v.invoiceForm.$invalid) {
				return;
			}
			let loading = this.$loading.show({
                    container: this.$refs.loadingRef,
                    isFullPage: false
			});
			
			this.$api.post('/v1/admin/scout-list/send-invoice-mail', this.invoiceForm)
			.then((r) => {
				loading.hide();
				const scout = r.data.data;
				this.projects.data
					.filter(x => x.id == scout.id)
					.forEach(x => x.scout_status = this.$configs.scouts.billed);
				this.$alertService.showSuccessDialog(null, this.$t('common.mail_is_sent'), this.$t('common.close'));
				this.requireInvoiceForm = false;
			})
			.catch(() => {
				loading.hide();
			})
		},
		confirmPayment(scoutId, index) {
			this.$alertService
			.showConfirmDialog(null, this.$t('common.payment_confirmed_question'), this.$t('common.yes'), this.$t('common.no'))
			.then((dialogResult) => {
				if (dialogResult.value) {
					this.$api.post('/v1/admin/scout-list/confirm-payment', { scout_id: scoutId })
					.then(() => {
						this.$data.projects.data[index].scout_status = this.$configs.scouts.payment_confirmed;
					})
					.catch(() => {
					})
				}
			});
		},
		showToggle(index) {
			this.current = index;
			if(this.status == true) {
				if(this.current == this.old_index) this.status = false; 
			} else {
				this.status = true;
			}
			this.old_index = index;
		},
		hideToggle() {
			this.status = false;
		},
	},
	computed: {
		currentUser() {
			return this.$store.getters.currentUser;
		},
		totalScouts: function() {
			return this.$data.projects.total;
		}		
	},
	watch: {
		'invoiceForm.default_amount': function() {
			let amount = Number(this.invoiceForm.default_amount);
			if (!isNaN(amount)) {
				this.invoiceForm.invoice_amount = amount + Number(this.invoiceForm.tax);
			} else {
				this.invoiceForm.invoice_amount = 0;
			}
		}
	},
	validations: {
		invoiceForm: {
			default_amount: { required, numeric }
		}
	}		
}
</script>

<style  scoped>
.border {
	padding: 0px 1rem;
	margin: 1rem 0px;
	border: 1px solid #dee2e6!important;
}
.email-box {
	padding-top: 15px;
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
.content-row .row, dl {
	margin-bottom: 10px;
}
.form-control.is-invalid, .was-validated .form-control:invalid {
    border-color: #dc3545;
}
.invalid-feedback {
    display: none;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}
.is-invalid~.invalid-feedback, .is-invalid~.invalid-tooltip, .was-validated :invalid~.invalid-feedback, .was-validated :invalid~.invalid-tooltip {
    display: block;
}
</style>
