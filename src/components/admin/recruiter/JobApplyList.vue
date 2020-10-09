<template>
    <div @click="handleStatusToggle">   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('jobapply_list.title') }}</h5>   
                <div class="inner-wrapper">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="企業番号">{{ $t('common.recruiter_number') }}</label>
                            <input type="text" placeholder="企業番号" class="form-control" v-model.trim="filteredData.recruiter_number">
                        </div>
                        <div class="col-md-3">
                            <label for="企業名">{{ $t('common.recruiter_name') }}</label>
                            <input type="text" placeholder="企業名" class="form-control" v-model.trim="filteredData.recruiter_name">
                        </div>
                        <div class="col-md-3">
                            <label for="求人番号">{{ $t('common.job_number') }}</label>
                            <input type="text" placeholder="求人番号" class="form-control" v-model.trim="filteredData.job_number">
                        </div>
                        <div class="col-md-3">
                            <label for="アスリート会員氏名">{{ $t('common.jobseeker_name') }}</label>
                            <input type="text" placeholder="アスリート会員氏名" class="form-control" v-model.trim="filteredData.jobseeker_name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="求人タイトル">{{ $t('common.job_title') }}</label>
                            <input type="text" placeholder="求人タイトル" class="form-control" v-model.trim="filteredData.job_title">
                        </div>                        
                    </div>
                    <div class="row date-row">
                        <div class="col-md-3 datepicker-wrapper">
                            <label for="スカウト日時">{{ $t('jobapply_list.jobapplay_date') }}</label>
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
                <!-- Search by Jobapply Status -->
                <label for="ステータス">{{ $t('common.status') }}</label>
                <div class="row">
                    <div class="col-md-12">                     
                        <div class="col-md-2 p-lr0" v-for="status in arr_status" v-bind:key="status.id">   
                            <label class="custom-control-label custom-checkbox-label">                       
                                <input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="status.id" :checked="status.checked" v-model="filteredData.jobapply_status" @change="getData()">
                                <span class="custom-check-label-post">{{status.id}}</span>
                            </label>                          
                        </div>  
                    </div>                    
                </div>
                <!--end advanced search-->     
            </div>
        </div> 
        <!-- Data table   -->
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
                <div class="tbl-wrap">
                    <DataTable ref="datatable" :columns="$t('jobapply_list.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy">
                        <tbody>
                            <tr v-for="(project, index) in projects.data" :key="project.id">
                                <td>{{project.management_number}}</td>
                                <td>{{project.job_apply_date | moment('YYYY/MM/D HH:mm:ss')}}</td>
                                <td class="text-left">
                                    <p><span>企業番号</span> - {{project.recruiter_number}}</p>
                                    <p><span>企業名</span> - {{project.recruiter_name}}</p>
                                </td>
                                <!-- <td>{{project.recruiter_number}}</td>
                                <td>{{project.recruiter_name}}</td> -->
                                <td>{{project.job_number}}</td>
                                <td class="text-left tbl-titw">
                                    <span class="txt-vertical-ellipsis">{{project.title}}</span>
                                </td>
                                <td>{{project.jobseeker_number}}</td>
                                <td>{{project.jobseeker_name}}</td>
                                <td>
                                    <div class="scout-box">
                                        <p class="scout-txt">{{project.job_apply_status}} </p>
                                        <p class="btn btn-common" v-on:click="showToggle(index)">
                                            {{$t('common.edit')}}
                                            <span class="down-icon">&#9662;</span>
                                        </p>
                                        <div class="scout-toggle"  :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (toggle_status == true)}">
                                            <p class="custom-radio-group mr-3"  v-for="status in arr_status" v-bind:key="status.id">
                                                <input type="radio" :id="status.id+index" v-model="project.job_apply_status" class="custion-radio" 
                                                    @change="onStatusChange(index, $event, project.recruiter_id)" :value="status.id">
                                                <label :for="status.id+index" class="custom-radio-lable status-lable" @click="hideToggle">{{ status.id }}</label>
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="tbl-wm">
                                    <span class="btn btn-default mb-1" @click="startChat(project)" v-if="allowChat(project.job_apply_status)">{{$t('common.chat')}}</span>
                                    <span class="btn btn-default mb-1" @click="confirmPayment(project.jobapply_id, index)" v-if="allowPaymentConfirm(project.job_apply_status)">{{$t('common.payment_confirm')}}</span>
                                    <span class="btn btn-default" @click="generateBill(project.jobapply_id, index)" v-if="allowBilling(project.job_apply_status)">{{$t('common.invoice_generate')}}</span>
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
        <!-- Invoice Area -->
        <div id="myModal" :class="['modal',requireInvoiceForm ? 'modal-open' : 'modal-close' ]">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close" @click="closeInvoiceModal">&times;</span>
                <div class="container-fluid vld-parent" ref="invoicePreviewContainer">
                    <div class="row"> 
                        <div class="col-sm-6">
                            <div class="border">
                                <h5>{{ $t('common.job') }}</h5>
                                <dl class="row">
                                    <dt class="col-sm-5 list-pl">{{ $t('jobapply_list.columns.0.name') }}</dt>
                                    <dd class="col-sm-7">{{ invoiceForm.management_number }}</dd>
                                    <dt class="col-sm-5 list-pl">{{ $t('jobapply_list.columns.5.name') }}</dt>
                                    <dd class="col-sm-7">{{ invoiceForm.title }}</dd>
                                </dl>
                                <h5>{{ $t('common.billing_recruiter') }}</h5>
                                <dl class="row">
                                    <dt class="col-sm-5 list-pl">{{ $t('jobapply_list.columns.2.name') }}</dt>
                                    <dd class="col-sm-7">{{ invoiceForm.recruiter_number }}</dd>
                                    <dt class="col-sm-5 list-pl">{{ $t('jobapply_list.columns.3.name') }}</dt>
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
                                    <div class="col-sm-6  pr-0">
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
                                    <dt class="col-sm-2  pr-0 txt-red">{{ $t('common.invoice_amount') }}</dt>
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
                                        <button class="btn job-btn" @click="loadInvoicePreview">{{ $t('common.invoice_preview') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6" v-if="invoicePreview">
                            <h5>{{ $t('common.invoice_preview') }}</h5>
                            <div class="invoice-preview-area">
                                <iframe v-bind:srcdoc="invoicePreview" frameborder="1" class="invoice-frame"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-sm-6">
                            <button class="btn job-btn mr-3"  @click="closeInvoicePreview">{{ $t('common.back') }}</button>
                            <button class="btn cancel-btn"  @click="closeInvoiceModal">{{ $t('common.cancel') }}</button>
                        </div>
                        <div class="col-sm-6 text-right">
                            <button class="btn job-btn"  @click="sendInvoiceMail" v-show="invoicePreview">{{ $t('common.send_invoice') }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Invoice Area -->
		<!-- chatbox -->
		<ChatComponent ref="refChatComponent" :type="'job-apply'" />
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
            let columns = this.$i18n.messages.en.jobapply_list.columns;
            columns.forEach(column => {
              sortOrders[column.label] = -1;
        });
        return {
            change_status: 0,
            requireInvoiceForm: false,
            invoicePreview: '',
            old_index:'',
            toggle_status:false,
            current: null,
            base_url: "/v1/admin/jobapply-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData:{
                recruiter_number: '',
                recruiter_name: '',
                job_number: '',
                jobseeker_name: '',
                job_title: '',
                from_date: '',
                to_date:'',
                jobapply_status: [],
            },
            arr_status: [
                { id: this.$configs.job_apply.under_review, checked: false },
                { id: this.$configs.job_apply.declined, checked: false },
                { id: this.$configs.job_apply.unclaimed, checked: false },
                { id: this.$configs.job_apply.billed, checked: false },
                { id: this.$configs.job_apply.payment_confirmed, checked: false }
            ],
            lang:{
                days: ['日', '月', '火', '水', '木', '金', '土'],
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                placeholder: {
                    date: '年 - 月 - 日',
                }
            },   
            invoiceForm: {
                jobapply_id: 0,
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
            return (status == this.$configs.job_apply.under_review || status == this.$configs.job_apply.unclaimed ||  status == this.$configs.job_apply.billed);
        },
        allowBilling(status) {
            return status == this.$configs.job_apply.unclaimed;
        },
        allowPaymentConfirm(status) {
            return status == this.$configs.job_apply.billed;
        },
        startChat(jobapply) {
			const payload = {
				recruiter_id: jobapply.recruiter_id,
				jobseeker_id: jobapply.jobseeker_id, 
				scoutid_or_applyid: jobapply.jobapply_id, 
				type: 'job-apply',
			};
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
        onStatusChange(index,e,recruiter_id) {
            this.change_status = 1;
            const job_apply = this.$data.projects.data[index];
            this.$alertService.showConfirmDialog(null, this.$tc('alertMessage.change_confirm_message', e.target.value, { n:e.target.value }), this.$t('common.yes'), this.$t('common.no'))
            .then(r => {
                if (r.value) {
                    this.$api.post('/v1/admin/jobapply-list/change-status', {
                        jobapply_id: job_apply.jobapply_id,
                        recruiter_id: recruiter_id,
                        status: e.target.value,
                    })
                    .then(res => {
                        console.log("changeStatus", res.data);
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
        generateBill(jobapply_id, index) {
			let jobapply = this.$data.projects.data[index];
            this.invoiceForm.jobapply_id = jobapply.jobapply_id;
            this.invoiceForm.title = jobapply.title;
            this.invoiceForm.management_number = jobapply.management_number;
            this.invoiceForm.recruiter_number = jobapply.recruiter_number;
            this.invoiceForm.recruiter_name = jobapply.recruiter_name;
            this.invoiceForm.email = jobapply.recruiter_email;
			this.invoiceForm.default_amount = 200000;
			this.invoiceForm.tax_id = this.tax.id;
            this.requireInvoiceForm = true;
        },
        confirmPayment(jobapplyId, index) {
            this.$alertService
            .showConfirmDialog(null, this.$t('common.payment_confirmed_question'), this.$t('common.yes'), this.$t('common.no'))
            .then((dialogResult) => {
                if (dialogResult.value) {
                    this.$api.post('/v1/admin/jobapply-list/confirm-payment', { jobapplyId: jobapplyId })
                    .then(() => {
                        this.$data.projects.data[index].job_apply_status = this.$configs.job_apply.payment_confirmed;
                    })
                    .catch(() => {
                    })
                }
            });
        },
        closeInvoiceModal() {
            // --close any preview
            this.closeInvoicePreview();
            // --reset invoice form data
            this.invoiceForm = {
                jobapply_id: 0,
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
            this.$api.post('/v1/admin/jobapply-list/generate-bill', this.invoiceForm)
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
             this.$api.post('/v1/admin/jobapply-list/send-invoice-mail', this.invoiceForm)
            .then((r) => {
                loading.hide();
                const job_apply = r.data.data;
                this.projects.data
                    .filter(x => x.jobapply_id == job_apply.id)
                    .forEach(x => x.job_apply_status = this.$configs.job_apply.billed);
				this.$alertService.showSuccessDialog(null, this.$t('common.mail_is_sent'), this.$t('common.close'));
                this.requireInvoiceForm = false;
                this.closeInvoiceModal();
            })
            .catch(() => {
                loading.hide();
            })
        },
        showToggle(index) {
            this.current = index;
			this.toggle_status = showToggle(index,this.old_index,this.toggle_status);
			this.old_index = index;
        },
        hideToggle() {
             this.toggle_status = false;
        },
    },
    computed: {
        totaljob_apply: function() {
            return this.$data.projects.total;
        },
        totalScouts: function() {
            return this.$data.projects.total;
        }   
    },
    watch: {
        'invoiceForm.default_amount': function() {
            let amount = Number(this.invoiceForm.default_amount);
            if (!isNaN(amount)) {
				// Re-value tax
				this.invoiceForm.tax = amount * (this.tax.percent ?? 0) / 100;
				// Re-value invoice amout
				this.invoiceForm.invoice_amount = amount + this.invoiceForm.tax;
            } else {
				this.invoiceForm.invoice_amount = 0;
				this.invoiceForm.tax = 0;
            }
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
			this.tax = { percent: 0 };
		})
	}      
}
</script>

<style scoped>
.border {
	padding: 0px 1rem;
	margin: 1rem 0px;
	border: 1px solid #dee2e6!important;
}
.email-box {
	padding-top: 15px;
}
.content-row .row, dl {
	margin-bottom: 10px;
}
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
.invoice-preview-area {
	border: 10px solid #ccc;
}
.invoice-frame {
	width: 100%;
	height: 584px;
	border: none;
}
.modal-content {
  background-color: #fefefe;
  margin: 70px auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  position: absolute;
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
	z-index: 100;
}
.list-pl {
    padding-left: 90px;
}
.job-btn {
	border-color: #b4c574;
    background-color: #9fb746;
}
.cancel-btn {
	border-color: #919191;
    background-color: #919191;
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
	max-width: calc(100vw - 20px);
	overflow-y: hidden;
	overflow-x: auto;
}
.chatbox-container * {
	margin-right: 5px;
}
.chatbox-container *:last-child {
	margin-right: 0px;
}
</style>