<template>
    <div @click="handleStatusToggle">   
        <div class="row">
            <div class="col-sm-12 p-0 searchform-one">
                <!--advanced search-->
                <h5 class="m-b-10 main-header">{{ $t('jobapply_list.title') }}</h5>   
                <div class="inner-wrapper">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="管理番号">{{ $t('common.management_no') }}</label>
                            <input type="text" placeholder="管理番号" class="form-control" v-model.trim="filteredData.management_no">
                        </div>
                        <div class="col-md-3">
                            <label for="企業会員番号">{{ $t('common.recruiter_number') }}</label>
                            <input type="text" placeholder="企業会員番号" class="form-control" v-model.trim="filteredData.recruiter_number">
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
							<label for="求職者会員番号">{{ $t('jobapply_list.jobseeker_number') }}</label>
							<input type="text" :placeholder="$t('jobapply_list.jobseeker_number')" class="form-control" v-model.trim="filteredData.jobseeker_number">
						</div>
                        <div class="col-md-3">
                            <label for="求職者会員氏名">{{ $t('common.jobseeker_name') }}</label>
                            <input type="text" placeholder="求職者会員氏名" class="form-control" v-model.trim="filteredData.jobseeker_name">
                        </div>                   
                    </div>
                    <div class="row date-row">
                        <div class="col-md-3 datepicker-wrapper">
                            <label for="スカウト日時">{{ $t('jobapply_list.jobapplay_date') }}</label>
                            <date-picker v-model="filteredData.from_date" valueType="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>                  
                        </div>  
                        <div class="col-md-3 datepicker-wrapper similarto">
                            <label for=""></label>
                            <date-picker v-model="filteredData.to_date" valueType="format" class="datepicker" :lang="lang"  placeholder="年 - 月 - 日"></date-picker> 
                        </div>                     
                        <div class="col-md-3 ml-auto">                        
                            <button class="btn searchbtn float-right"  @click="getData()">{{ $t('common.search') }}</button>
                        </div>                
                    </div>
                </div>
                <!-- Search by Jobapply Status -->
                <label for="ステータス">
                {{ $t('common.status') }}
                <!--status click-->                    
                    <span @click="visible = !visible" ref="tooltip-box" style="cursor:pointer">                   
                        <svg x="0px" y="0px" viewBox="0 0 512 512" style="width: 15px; height: 15px; opacity: 1;"><g>
                        <path class="st0" d="M256,0C114.616,0,0,114.612,0,256s114.616,256,256,256s256-114.612,256-256S397.385,0,256,0z M207.678,378.794
                        c0-17.612,14.281-31.893,31.893-31.893c17.599,0,31.88,14.281,31.88,31.893c0,17.595-14.281,31.884-31.88,31.884
                        C221.959,410.678,207.678,396.389,207.678,378.794z M343.625,218.852c-3.596,9.793-8.802,18.289-14.695,25.356
                        c-11.847,14.148-25.888,22.718-37.442,29.041c-7.719,4.174-14.533,7.389-18.769,9.769c-2.905,1.604-4.479,2.95-5.256,3.826
                        c-0.768,0.926-1.029,1.306-1.496,2.826c-0.273,1.009-0.558,2.612-0.558,5.091c0,6.868,0,12.512,0,12.512
                        c0,6.472-5.248,11.728-11.723,11.728h-28.252c-6.475,0-11.732-5.256-11.732-11.728c0,0,0-5.645,0-12.512
                        c0-6.438,0.752-12.744,2.405-18.777c1.636-6.008,4.215-11.718,7.508-16.694c6.599-10.083,15.542-16.802,23.984-21.48
                        c7.401-4.074,14.723-7.455,21.516-11.281c6.789-3.793,12.843-7.91,17.302-12.372c2.988-2.975,5.31-6.05,7.087-9.52
                        c2.335-4.628,3.955-10.067,3.992-18.389c0.012-2.463-0.698-5.702-2.632-9.405c-1.926-3.686-5.066-7.694-9.264-11.29
                        c-8.45-7.248-20.843-12.545-35.054-12.521c-16.285,0.058-27.186,3.876-35.587,8.62c-8.36,4.776-11.029,9.595-11.029,9.595
                        c-4.268,3.718-10.603,3.85-15.025,0.314l-21.71-17.397c-2.719-2.173-4.322-5.438-4.396-8.926c-0.063-3.479,1.425-6.81,4.061-9.099
                        c0,0,6.765-10.43,22.451-19.38c15.62-8.992,36.322-15.488,61.236-15.429c20.215,0,38.839,5.562,54.268,14.661
                        c15.434,9.148,27.897,21.744,35.851,36.876c5.281,10.074,8.525,21.43,8.533,33.38C349.211,198.042,347.248,209.058,343.625,218.852
                        z" style="fill: rgb(145 145 145);"></path>
                        </g>
                        </svg>                  
                    </span>
                    <span class="bg" v-if="visible" @click="visible=!visible"></span>
                    <span class="tooltip-box" v-if="visible">
                        <table class="tooltiptext">
                            <thead>
                                <tr><th colspan="2" class="tooltip-head">ステータスの説明</th></tr>
                            </thead>
                            <tbody>
                                <tr><td class="w-105">興味あり</td><td>求職者会員がスカウトに興味を示した状態。</td></tr>
                                <tr><td class="w-105">期限切れ</td><td>スカウトへの回答期限切れ。</td></tr>
                                <tr><td class="w-105">不採用/辞退</td><td>企業会員からの不採用又は求職者会員の辞退。</td></tr>
                                <tr><td class="w-105">内定済未請求</td><td>企業会員からの内定の連絡があったが、手数料を未請求。</td></tr>
                                <tr><td class="w-105">請求済</td><td>企業会員に手数料を請求済。</td></tr>
                                <tr><td class="w-105">入金確認済</td><td>企業会員からの手数料の入金を確認済。</td></tr>
                            </tbody>
                        </table>
                    </span>                    
                    <!-- end status click -->
                </label>
                <div class="status-row">                     
                    <div class="status-col" v-for="status in arr_status" v-bind:key="status.id">   
                        <label class="custom-control-label custom-checkbox-label">                       
                            <input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="status.id" :checked="status.checked" v-model="filteredData.jobapply_status" @change="getData()">
                            <span class="custom-check-label-post">{{status.id}}</span>
                        </label>                          
                    </div> 
                    <div>
                       <label class="custom-control-label custom-checkbox-label">                       
                            <input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" :value="de_status.id" :checked="de_status.checked" v-model="filteredData.jobapply_status" @change="getData()">
                            <span class="custom-check-label-post">{{de_status.id}}</span>
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
                    <DataTable ref="datatable" :columns="$t('jobapply_list.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy" :totalLength="projects.total">
                        <tbody>
                            <tr v-for="(project, index) in projects.data" :key="project.id">
                                <td class="tbl-ws">{{project.management_number}}</td>
                                <td class="tbl-w135"><p class="tbl-ws m-auto">{{project.job_apply_date | moment('YYYY/MM/D HH:mm:ss')}}</p></td>
                                <td class="text-left tbl-wl">
                                    <router-link :to="{ path: '/admin-recruiter-list/recruiter/'+ project.recruiter_id +'/detail'}" class="d-flex">{{project.recruiter_number}}
                                    <span class="ml-2 txt-vertical-ellipsis">{{ project.recruiter_name }}</span>
                                    </router-link>
                                </td>
                                <!-- <td>{{project.recruiter_number}}</td>
                                <td>{{project.recruiter_name}}</td> -->
                                <td class="text-left job-col">
                                    <router-link :to="{ path: '/job-list/'+ project.job_id +'/detail'}">
                                        <span class="job-no">{{ project.job_number }}</span>
                                        <span class="txt-vertical-ellipsis job-tit">{{ project.title }}</span>
                                    </router-link>
                                </td>
                                <!-- <td><router-link :to="{ path: '/job-list/'+ project.job_id +'/detail'}">{{project.job_number}}</router-link></td>
                                <td class="text-left tbl-titw"><router-link :to="{ path: '/job-list/'+ project.job_id +'/detail'}">
                                    <span class="txt-vertical-ellipsis">{{project.title}}</span></router-link>
                                </td> -->
                                <td class="text-left tbl-wl">
                                    <router-link :to="{ path: '/admin-jobseeker-list/jobseeker/'+ project.jobseeker_id +'/detail'}" class="d-flex">
                                    {{project.jobseeker_number}}
                                    <span class="ml-2 txt-vertical-ellipsis">{{project.jobseeker_name}}</span>
                                    </router-link>
                                </td>
                                <!-- <td><router-link :to="{ path: '/admin-jobseeker-list/jobseeker/'+ project.jobseeker_id +'/detail'}">{{project.jobseeker_number}}</router-link></td>
                                <td><router-link :to="{ path: '/admin-jobseeker-list/jobseeker/'+ project.jobseeker_id +'/detail'}">{{project.jobseeker_name}}</router-link></td> -->
                                <td class="tbl-ws">
                                    <div class="scout-box">
                                        <p class="scout-txt">{{project.job_apply_status}} </p>
                                        <p class="btn btn-common" v-on:click="showToggle(index)">
                                            {{$t('common.change')}}
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
                                <td class="tbl-ws">
                                    <span class="btn btn-default mb-1" @click="startChat(project)" v-if="allowChat(project.job_apply_status)">{{$t('common.chat')}}</span>
                                   <!--  <span class="btn btn-default mb-1" @click="confirmPayment(project.jobapply_id, index)" v-if="allowPaymentConfirm(project.job_apply_status)">{{$t('common.payment_confirm')}}</span> -->
                                    <span class="btn btn-default" @click="generateBill(project.jobapply_id, index)" v-if="allowBilling(project.job_apply_status)">{{$t('common.invoice_generate')}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </DataTable>
                    <div  v-if="projects.length == 0">
                        <p class="no-data-txt-border">データがありません</p>
                    </div>
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
                <p class="close-ico"  @click="closeInvoiceModal">
					<span class="icon icon-times"></span>
				</p>
                <div class="container-fluid vld-parent" ref="invoicePreviewContainer">
                    <div class="row d-flex"> 
                        <div class="col-sm-6">
                            <div class="border">
                                <h5>求人</h5>
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
                                            <div class="error" v-if="!$v.invoiceForm.default_amount.numeric">半角数字で入力してください</div>
                                        </div>
                                    </div>
                                    <label class="pl-1 pt-2">円</label>
                                </div>
                                <dl class="row">
                                    <dt class="col-sm-2 text-right pr-0">{{ $t('common.tax') }}</dt>
                                    <dd class="col-sm-6 text-right">{{ invoiceForm.tax|aj-number }}</dd>
                                    <label class="pl-1">円</label>
                                </dl>
                                <dl class="row">
                                    <dt class="col-sm-2  pr-0 txt-red text-right">{{ $t('common.invoice_amount') }}</dt>
                                    <dd class="col-sm-6 text-right txt-red">{{ invoiceForm.invoice_amount|aj-number }}</dd>
                                    <label class="pl-1 txt-red">円</label>
                                </dl>
                                <div class="form-group row">
                                    <label class="col-sm-2 pr-0 text-right">{{ $t('common.remark') }}</label>
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
                        <div class="col-sm-6  invoice-col" >
                            <h5 class="main-header">{{ $t('common.invoice_preview') }}</h5>
                            <div class="invoice-preview-area"  v-if="invoicePreview">
                                <iframe :src="invoicePreview" frameborder="1" class="invoice-frame"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-sm-6">
                            
                            <button class="btn btn-cancel w-100"  @click="closeInvoiceModal">{{ $t('common.cancel') }}</button>
                        </div>
                        <div class="col-sm-6 text-right">
                            <button class="btn btn-second"  @click="sendInvoiceMail" v-show="invoicePreview">{{ $t('common.send_invoice') }}</button>
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
import { showToggle,handleStatus } from "../../../partials/common";

export default {
	mixins: [DataTableServices],
        data(){
            let sortOrders = {};
            let columns = this.$i18n.messages.en.jobapply_list.columns;
            columns.forEach(column => {
              sortOrders[column.label] = -1;
        });
        return {
            pdf_file_path:'',
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
                jobseeker_number: '',
                jobseeker_name: '',
                job_title: '',
                from_date: '',
                to_date:'',
                management_no: '',
                jobapply_status: [],
            },
            arr_status: [
                { id: this.$configs.job_apply.under_review, checked: false },
                { id: this.$configs.job_apply.declined, checked: false },
                { id: this.$configs.job_apply.unclaimed, checked: false },
                { id: this.$configs.job_apply.billed, checked: false },
                { id: this.$configs.job_apply.payment_confirmed, checked: false },
            ],
            de_status: { id: this.$configs.job_apply.deactivated, checked: false },
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
            visible: false
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
			this.$emit('chatStarted', payload);
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
            /* if(this.pdf_file_path != ''){
                // delete pdf from tmp folder in server
                this.$api.post('/v1/admin/jobapply-list/generate-bill/tmp-delete', {file_path : this.pdf_file_path})
                .then((r) => {
                    console.log(r.data);
                })
                .catch((e) => {
                    console.log(e);
                });
            } */
        },
        loadInvoicePreview() {
            this.$v.invoiceForm.$touch();
            if (this.$v.invoiceForm.$invalid) {
                return;
            }
            
            this.$api.post('/v1/admin/jobapply-list/generate-bill', this.invoiceForm).then((response) => {
                var enURL = encodeURI(response.data.data.pdf);
                this.invoicePreview = `data:application/pdf;base64, ${enURL}`;
            })
            .catch((e) => {
                console.log(e);
            });
            /* this.$api.post('/v1/admin/jobapply-list/generate-bill', this.invoiceForm)
            .then((r) => {
                // display pdf from tmp folder of server side
                let laravel_api = process.env.VUE_APP_API_URL;
                let base_url    = laravel_api.replace('/api/','');
                this.pdf_file_path  = r.data.data;
                this.invoicePreview = `${base_url}/${this.pdf_file_path}`;
            })
            .catch(() => {
            }); */
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
dl {
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
.invoice-col {
    margin-bottom: 1.625rem;
}
.invoice-preview-area {
    height: 95%;
	border: 10px solid #ccc;
}
.invoice-frame {
	width: 100%;
	height: 100%;
	border: none;
}
.modal-content {
    max-width: 1200px;
    width: 80%;
    margin: 70px auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    background-color: #fefefe;
}
.close-ico {
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
.list-pl {
    padding-left: 90px;
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
.similarto::before {
    position: absolute;
    content: "~";
    top: 20px;
    left: -10px;
    font-size: 25px;
}
.job-col {
    position: relative;
}
.job-no {
    position: absolute;
}
.job-tit {
    margin-left: 95px;
}
/* tooltip for status */
.tooltip {
    width: 500px;
    background-color: #5cb1ab;
    color: #fff;   
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    z-index: 1;
    bottom: 150%;
}
.tooltip-box .tooltiptext {     
    visibility: visible;
    background-color: rgba(94,94,99,1);
    color: #fff;
    text-align: center;
    word-break: break-word;
    border: 1px solid #363030ee;
    border-radius: 5px;
    padding: 20px;
    position: absolute;
    z-index: 33;
    bottom: 20%;
    opacity: 0.9;
    min-width: 517px;
    text-align: left;
    margin-left: 0px;
}
.tooltip-box .tooltiptext::after{
    display: none;
}
.tooltip-box table{
    border-collapse: initial !important;
}
.tooltip-box table tr{
    vertical-align: top;
    background: none !important;
}
.tooltip-head{
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 10px;
}
.w-105{
    width: 105px;
}
.bg {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  transition: .3s;
}
</style>