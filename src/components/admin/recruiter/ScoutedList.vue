<template>
    <div @click="handleStatusToggle">   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('scouted_list.title') }}</h5>   
				<div class="inner-wrapper">
					<div class="row">
						<div class="col-md-3">
							<label for="企業番号">{{ $t('common.scout_recruiter_number') }}</label>
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
					<div class="row date-row">
						<div class="col-md-3 datepicker-wrapper">
							<label for="スカウト日時">{{ $t('scouted_list.scout_date') }}</label>
							<date-picker v-model="filteredData.from_date" valueType="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>                  
						</div>  
						<div class="col-md-3 datepicker-wrapper">
							<label for=""></label>
							<date-picker v-model="filteredData.to_date" valueType="format" class="datepicker" :lang="lang"  placeholder="年 - 月 - 日"></date-picker> 
						</div>                     
						<div class="col-md-3">                        
							<button class="btn searchbtn"  @click="getData()">{{ $t('common.search') }}</button>
						</div>                
					</div>
				</div>
				<!-- Search by Status -->
				<label for="ステータス">{{ $t('common.status') }}</label>
				<div class="status-row">                     
					<div class="status-col" v-for="status in arr_status" v-bind:key="status.id">    
						<label class="custom-control-label custom-checkbox-label">                      
							<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="status.id" :checked="status.checked" v-model="filteredData.scout_status" @change="getData()">
							<span class="custom-check-label-post">{{status.id}}</span>
						</label>                          
					</div>  
				</div>
                <!--end advanced search-->     
            </div>
        </div>   
		<!-- Data table   -->
        <div class="row">
            <div class="col-sm-12 p-0">
                <div class="row">
                    <div class="col-sm-12 select">
                        <span>{{ $t('common.total_results') }}: {{ $tc('common.item', totalScouts, { n:totalScouts }) }}</span><br>
                        <span>1 {{ $t('common.displayed_page') }}&nbsp;</span>
                        <select v-model="tableData.length" @change="getData()">
                            <option v-for="(records, index) in perPage" :key="index" :value="records">
                                {{records}}
                            </option>
                        </select>
                    </div>
                </div>
				<div class="tbl-wrap">
					<DataTable ref="datatable" :columns="$t('scouted_list.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy">
						<tbody>
							<tr v-for="(project, index) in projects.data" :key="project.id">
								<td>{{project.management_number}}</td>
								<td>{{project.scouted_date | moment('YYYY/MM/D HH:mm:ss')}}</td>
								<!-- <td>{{project.recruiter_number}}</td>
								<td>{{project.recruiter_name}}</td> -->
								<td class="text-left tbl-wl ">
                                    <!-- <p><span class="font-weight-bold d-inline-block" style="width:30px;">番号</span> - {{project.recruiter_number}}</p>
                                    <p><span class="font-weight-bold  d-inline-block" style="width:30px;">名</span> - {{project.recruiter_name}}</p> -->
									<p class="d-flex">{{project.recruiter_number}} <span class="ml-2 txt-vertical-ellipsis">{{project.recruiter_name}}</span></p>
                                </td>
								<td>{{project.job_number}}</td>
								<td  class="text-left tbl-titw" @click="textEllipsis($event)"><span class="txt-vertical-ellipsis">{{ project.title }}</span></td>
								<!-- <td>{{project.jobseeker_number}}</td>
								<td>{{project.jobseeker_name}}</td> -->
								
								<td class="text-left tbl-wl ">
                                    <!-- <p><span class="font-weight-bold d-inline-block" style="width:30px;">番号</span> - {{project.jobseeker_number}}</p>
                                    <p><span class="font-weight-bold  d-inline-block" style="width:30px;">名</span> - {{project.jobseeker_name}}</p> -->
									<p class="d-flex">{{project.jobseeker_number}} <span class="ml-2 txt-vertical-ellipsis">{{project.jobseeker_name}}</span></p>
                                </td>
								<td style="position:relative;">
									<div class="scout-box">
										<p class="scout-txt">{{project.scout_status}} </p>
										<p class="btn btn-common" v-on:click="showToggle(index)">
											{{$t('common.edit')}}
											<span class="down-icon">&#9662;</span>
										</p>
										<div class="scout-toggle"  :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (toggle_status == true)}">
											<p class="custom-radio-group mr-3"  v-for="status in arr_status" v-bind:key="status.id">
												<input type="radio" :id="status.id+index" v-model="project.scout_status" class="custion-radio" 
													@change="onStatusChange(index, $event)" :value="status.id">
												<label :for="status.id+index" class="custom-radio-lable status-lable" @click="hideToggle">{{ status.id }}</label>
											</p>
										</div>
									
									</div>
								</td>
								<td class="tbl-wm">
									<span class="btn btn-default mb-1" @click="startChat(project)" v-if="allowChat(project.scout_status)">{{$t('common.chat')}}</span>
									<span class="btn btn-default mb-1" @click="confirmPayment(project.id, index)" v-if="allowPaymentConfirm(project.scout_status)">{{$t('common.payment_confirm')}}</span>
									<span class="btn btn-default" @click="generateBill(project.id, index)" v-if="allowBilling(project.scout_status)">{{$t('common.invoice_generate')}}</span>
								</td>
							</tr>
						</tbody>
					</DataTable>
				</div>
                <pagination v-if="projects.length != 0" :data="projects" @pagination-change-page="getData" :limit="limitpc">
                    <span slot="prev-nav">
                        <i class="fas fa-angle-left"></i> 前へ
                    </span>
                    <span slot="next-nav">
                        次へ <i class="fa fa-angle-right"></i>
                    </span>
                </pagination>

            </div>
        </div>
		<!-- Modal content -->
		<div id="myModal" :class="['modal',requireInvoiceForm ? 'modal-open' : 'modal-close' ]">
			<div class="modal-content">
				<!-- <span class="close" @click="closeInvoiceModal">&times;</span> -->
				<p class="close-ico" @click="closeInvoiceModal">
					<span class="icon icon-times"></span>
				</p>
				<div class="container-fluid vld-parent" ref="invoicePreviewContainer">
					<div class="row">
						<div class="col-sm-6">
							<div class="border">
								<h5>{{ $t('common.job') }}</h5>
								<dl class="row mb-4">
									<dt class="col-sm-5 scouted-list">{{ $t('scouted_list.columns.0.name') }}</dt>
									<dd class="col-sm-7">{{ invoiceForm.management_number }}</dd>
									<dt class="col-sm-5 scouted-list">{{ $t('scouted_list.columns.5.name') }}</dt>
									<dd class="col-sm-7">{{ invoiceForm.title }}</dd>
								</dl>
								<h5>{{ $t('common.billing_recruiter') }}</h5>
								<dl class="row">
									<dt class="col-sm-5 scouted-list">{{ $t('scouted_list.columns.2.name') }}</dt>
									<dd class="col-sm-7">{{ invoiceForm.recruiter_number }}</dd>
									<dt class="col-sm-5 scouted-list">{{ $t('scouted_list.columns.3.name') }}</dt>
									<dd class="col-sm-7">{{ invoiceForm.recruiter_name }}</dd>
								</dl>
							</div>		
							<div class="border">
								<dl class="row email-box">									
									<dt class="col-sm-6">{{ $t('common.billing_mail') }}</dt>
									<dd class="col-sm-6">{{ invoiceForm.email }}</dd>
								</dl>
							</div>
							<div class="border">
								<h5>{{ $t('common.brokerage_fee') }}</h5>
								<div class="form-group row">
									<div class="col-sm-2"></div>
									<div class="col-sm-6 pr-0">
										<input type="text" :class="['form-control text-right', $v.invoiceForm.default_amount.$error ? 'is-invalid' :'']" v-model="$v.invoiceForm.default_amount.$model">
										<div class="invalid-feedback">
											<div class="error" v-if="!$v.invoiceForm.default_amount.required">入力されていません</div>
											<div class="error" v-if="!$v.invoiceForm.default_amount.numeric">電話番号は数字のみである必須があります</div>
										</div>
									</div>
									<label class="pl-1 pt-2">円</label>
								</div>
								<dl class="row">
									<dt class="col-sm-2 text-right">{{ $t('common.tax') }}</dt>
									<dd class="col-sm-6 text-right">{{ invoiceForm.tax|aj-number }}</dd>
									<label class="pl-1">円</label>
								</dl>
								<dl class="row">
									<dt class="col-sm-2 pr-0 txt-red">{{ $t('common.invoice_amount') }}</dt>
									<dd class="col-sm-6 text-right txt-red">{{ invoiceForm.invoice_amount|aj-number }}</dd>
									<label class="pl-1 txt-red">円</label>
								</dl>
								<div class="form-group row">
									<label class="col-sm-2 pr-0">{{ $t('common.remark') }}</label>
									<div class="col-sm-9">
										<textarea rows="5" class="form-control" v-model="invoiceForm.remark"></textarea>
									</div>
								</div>
								<div class="form-group row">
									<div class="col-sm-11 text-right">
										<button class="btn btn-second" @click="loadInvoicePreview">{{ $t('common.invoice_preview') }}</button>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6" v-if="invoicePreview">
							<h5>{{ $t('common.invoice_preview') }}</h5>
							<div class="invoice-preview-area">
								<iframe v-bind:srcdoc="invoicePreview" class="invoice-frame"></iframe>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6">
							<button class="btn btn-second mr-2 w-100"  @click="closeInvoicePreview">{{ $t('common.back') }}</button>
							<button class="btn btn-cancel w-100" @click="closeInvoiceModal">{{ $t('common.cancel') }}</button>
						</div>
						<div class="col-sm-6 text-right">
							<button class="btn btn-second" style="margin-right: 1rem;" @click="sendInvoiceMail" v-show="invoicePreview">{{ $t('common.send_invoice') }}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- End Modal Content -->
		
		<!-- <div ref="chatboxContainer" class="chatbox-container">
			<div v-for="(chatbox) in chatBoxes" :key="chatbox.scoutid_or_applyid">
				<ChatBox :payload="chatbox" @chatboxClosed="onChatboxClosed"></ChatBox>
			</div>
		</div> -->

		<!-- chatbox -->
		<ChatComponent ref="refChatComponent" :type="'scout'" />
		<!-- end chatbox -->

    </div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";
import { required, numeric } from "vuelidate/lib/validators";
import { showToggle,handleStatus } from "../../../partials/common";
import ChatComponent from '../../ChatComponent';

export default {
	mixins: [DataTableServices],
	components: { ChatComponent },
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
			toggle_status:false,
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
				tax: 0,
				default_amount: 0,
				invoice_amount: 0,
				remark: '',
			},
			isToggle : false ,
			tax: {},
			chatBoxes: [],
		}
	},
	
	methods: {
		handleStatusToggle(e) {
			if(handleStatus(e.target.className) == false) 
				this.toggle_status = false;
        },
		allowChat(status) {
			return (status == this.$configs.scouts.interested || status == this.$configs.scouts.unclaimed ||  status == this.$configs.scouts.billed);
		},
		allowBilling(status) {
			return status == this.$configs.scouts.unclaimed;
		},
		allowPaymentConfirm(status) {
			return status == this.$configs.scouts.billed;
		},
		startChat(scout) {
			const payload = {
				recruiter_id: scout.recruiter_id,
				jobseeker_id: scout.jobseeker_id,
				scoutid_or_applyid: scout.id,
				type: 'scout',
			};
			// if (!this.chatBoxes.find(x => x.scoutid_or_applyid == payload.scoutid_or_applyid && x.type == payload.scoutid_or_applyid)) {
			// 	this.chatBoxes.push(payload);
			// }
			this.$refs.refChatComponent.isToggled = true;
			this.$refs.refChatComponent.getMessage(payload);
		},
		onChatboxClosed(e) {
			const t = this.chatBoxes.find(x => {
				return x.scoutid_or_applyid == e.scoutid_or_applyid & x.type == e.type;
			});
			if (t) {
				let i = this.chatBoxes.indexOf(t);
				if (i > -1) {
					this.$delete(this.chatBoxes, i);
				}
			}
		},
		onStatusChange(index, e) {
			const scout = this.$data.projects.data[index];
			this.$alertService.showConfirmDialog(null,this.$tc('alertMessage.change_confirm_message', e.target.value, { n:e.target.value }), this.$t('common.yes'), this.$t('common.no')) 
			.then(r => {
				if (r.value) {
					this.$api.post('/v1/admin/scout-list/change-status', { 
						scout_id: scout.id, 
						status: e.target.value,
					})
					.then(() => {
                        this.getData(this.projects.current_page);
					})
					.catch((r) => {
						const data = r.response.data;
						this.$alertService.showErrorDialog(null,data.error.message);
						// --Rebind original status
						this.getData(this.projects.current_page);
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
			this.invoiceForm.tax_id = this.tax.id;
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
				default_amount: 200000,
				invoice_amount: 220000,
				tax:20000,
				remark: '',
				tax_id: this.tax.id,
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
                isFullPage: true
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
				this.closeInvoiceModal();
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
			this.toggle_status = showToggle(index,this.old_index,this.toggle_status);
			this.old_index = index;
		},
		hideToggle() {
			this.toggle_status = false;
		},
		textEllipsis(event){
            if(event.target.className == "txt-vertical-ellipsis") {
                event.target.className = "";
            } 
            else if(event.target.className == "") {
                event.target.className = "txt-vertical-ellipsis";
            }
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
			// if (!isNaN(amount)) {
				// Re-value tax
				this.invoiceForm.tax = amount * (this.tax.percent ?? 0) / 100;
				// Re-value invoice amout 
				this.invoiceForm.invoice_amount = amount + this.invoiceForm.tax;
			// } else {
			// 	this.invoiceForm.invoice_amount = 0;
			// 	this.invoiceForm.tax = 0;
			// }
		}
	},
	validations: {
		invoiceForm: {
			default_amount: { required, numeric }
		}
	},
	created() {
		this.$api.get('/v1/tax/current')
		.then(r => {
			this.tax = r.data.data;
		})
		.catch(() => {
			console.log("There was  an error when fetching tax percentage.");
			this.tax = { percent: 2 };
		})
	}
}
</script>

<style  scoped>
.tbl-wrap .table {
    min-width: 1200px;
}
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
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: rgba(0,0,0,0.4); 
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
.close-ico {
	/* position: absolute;
	width: 40px;
	height: 40px;
	top: -10px;
	right: -10px;
	font-size: 35px;
	font-weight: bold;
	background: #fff;
	border: 1px solid;
	border-radius: 50%;
	text-align: center;
	line-height: 33px;
	vertical-align: middle;
	opacity: 0.8;
	z-index: 100; */
	position: absolute;
    top: 10px;
	right: 15px;
	width: 35px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    line-height: 35px;
    font-size: 16px;
    background: transparent;
    border-radius: 50px;
    color: #919191;
	border: 1px solid;
	cursor: pointer;
	z-index: 100;
}
.close-ico .icon {
	font-size: 13px;
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
.chatbox-container {
	position: fixed;
	bottom: 10px;
	right: 10px;
	z-index: 100;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;	
	background: #FFF;
}
.chatbox-container * {
	margin-right: 5px;
}
.chatbox-container *:last-child {
	margin-right: 0px;
}

/* modal box */
.invoice-preview-area {
	border: 10px solid #ccc;
}
.invoice-frame {
	width: 100%;
	height: 584px;
	border: none;
}
.scouted-list {
	padding-left: 90px;
}

</style>

