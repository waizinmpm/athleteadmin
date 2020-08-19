<template>
    <div>   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('jobapply_list.title') }}</h5>   
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
                            <label for="求人タイトル">{{ $t('common.jobseeker_name') }}</label>
                            <input type="text" placeholder="求人タイトル" class="form-control" v-model.trim="filteredData.job_title">
                        </div>
                        <div class="col-md-3">
                            <label for="アスリート会員氏名">{{ $t('common.job_title') }}</label>
                            <input type="text" placeholder="アスリート会員氏名" class="form-control" v-model.trim="filteredData.jobseeker_name">
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-md-3 datepicker-wrapper">
                            <label for="スカウト日時">{{ $t('jobapply_list.jobapplay_date') }}</label>
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
                                <input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="status.id" :checked="status.checked" v-model="filteredData.jobapply_status" @change="getData()">
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
                <DataTable ref="datatable" :columns="$t('jobapply_list.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy">
                    <tbody>
                        <tr v-for="(project, index) in projects.data" :key="project.id">
                            <td>{{project.jobapply_id}}</td>
                            <td>{{project.job_apply_date| date('%Y-%m-%d')}}</td>
                            <td>{{project.recruiter_number}}</td>
                            <td>{{project.recruiter_name}}</td>
                            <td>{{project.job_number}}</td>
                            <td>{{project.title}}</td>
                            <td>{{project.jobseeker_number}}</td>
                            <td>{{project.jobseeker_name}} <span class="btn btn-default">{{$t('common.edit')}}</span> </td>
                            <td>{{project.job_apply_status}}</td>
                            <td style="width:200px;">
                                <span class="btn btn-default" @click="startChat" v-if="allowChat(project.job_apply_status)">{{$t('common.chat')}}</span>
                                <span class="btn btn-default" @click="confirmPayment(project.jobapply_id, index)" v-if="allowPaymentConfirm(project.job_apply_status)">{{$t('common.payment_confirm')}}</span>
                                <span class="btn btn-default" @click="generateBill(project.jobapply_id, index)" v-if="allowBilling(project.job_apply_status)">{{$t('common.invoice_generate')}}</span>
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
        <!-- Invoice Area -->
        <div id="myModal" :class="['modal',requireInvoiceForm ? 'modal-open' : 'modal-close' ]">
			<!-- Modal content -->
            <div class="modal-content">
                <span class="close" @click="closeInvoiceModal">&times;</span>
                <div class="container-fluid vld-parent" ref="invoicePreviewContainer">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="border">
                                <h4>{{ $t('common.job') }}</h4>
                                <dl class="row">
                                    <dt class="col-sm-2 text-right">{{ $t('jobapply_list.columns.0.label') }}</dt>
                                    <dd class="col-sm-9">{{ invoiceForm.management_number }}</dd>
                                    <dt class="col-sm-2 text-right">{{ $t('jobapply_list.columns.5.label') }}</dt>
                                    <dd class="col-sm-9">{{ invoiceForm.title }}</dd>
                                </dl>
                                <h4>{{ $t('common.billing_recruiter') }}</h4>
                                <dl class="row">
                                    <dt class="col-sm-2 text-right">{{ $t('jobapply_list.columns.2.label') }}</dt>
                                    <dd class="col-sm-9">{{ invoiceForm.recruiter_number }}</dd>
                                    <dt class="col-sm-2 text-right">{{ $t('jobapply_list.columns.3.label') }}</dt>
                                    <dd class="col-sm-9">{{ invoiceForm.recruiter_name }}</dd>
                                </dl>
                            </div>		
                            <div class="border">
                                <dl class="row email-box">									
                                    <dt class="col-sm-4">{{ $t('common.billing_mail') }}</dt>
                                    <dd class="col-sm-8">{{ invoiceForm.recruiter_email }}</dd>
                                </dl>
                            </div>
                            <div class="border">
                                <h4>{{ $t('common.brokerage_fee') }}</h4>
                                <div class="form-group row">
                                    <div class="col-sm-2"></div>
                                    <div class="col-sm-6">
                                        <input type="text" :classo="['form-control text-right', $v.invoiceForm.default_amount.$error ? 'is-invalid' :'']" v-model="$v.invoiceForm.default_amount.$model">
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
        <!-- End Invoice Area -->
</div>
</template>

<script>
import DataTableServices from "../../DataTable/DataTableServices";
import { required, numeric } from "vuelidate/lib/validators";

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
                invoicePreview: '',
                old_index:'',
                status:false,
                current: null,
                base_url: "/v1/admin/jobapply-list",
                columns: columns,
                sortOrders: sortOrders,
                
                filteredData:{
                    recruiter_id: '',
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
                    // scout_id: 0,
                    jobapply_id: 0,
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
            }
        },
        methods: {
			allowChat(status) {
				return status == this.$configs.job_apply.under_review;
			},
			allowBilling(status) {
				return status == this.$configs.job_apply.unclaimed;
			},
			allowPaymentConfirm(status) {
				return status == this.$configs.job_apply.billed;
			},
			startChat() {
				alert("Now will start chatting...");
            },
            onStatusChange(index, e) {
                const job_apply = this.$data.projects.data[index];
                this.$api.post('/v1/admin/jobapply-list/change-status', {
                    jobapply_id: job_apply.id,
                    status: e.target.value,
                })
                .then(() => {
                    this.$data.projects.data[index].job_apply_status = e.target.value;
                })
                .catch(() => {
                })
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
                    // scout_id: 0,
                    jobapply_id: 0,
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
                this.$api.post('/v1/admin/jobapply-list/send-invoice-mail', this.invoiceForm)
                .then((r) => {
                    const job_apply = r.data.data;
                    this.projects.data
                        .filter(x => x.jobapply_id == job_apply.id)
                        .forEach(x => x.job_apply_status = this.$configs.scouts.billed);
                    this.$alertService.showSuccessDialog(null, this.$t('common.mail_is_sent'), this.$t('common.close'));
                    this.requireInvoiceForm = false;

                })
                .catch(() => {
                    
                })
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

<style scoped>
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
</style>