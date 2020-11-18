<template>
	<div>
		<div class="row">
			<div class="col-sm-12 p-0 searchform-one">
				<h5 class="m-b-10 main-header">{{ $t('payment_management.title') }}</h5>
				<div class="inner-wrapper">
					<div class="row mb-1">
						<div class="col-md-3">
							<label for="management_number">{{ $t('payment_management.management_number') }}</label>
							<input type="text" :placeholder="$t('payment_management.management_number')" class="form-control" 
								v-model.trim="filteredData.management_number">
						</div>
						<div class="col-md-8">
							<div class="col-md-12 p-0 mb-2">
								<label>{{ $t('payment_management.payment_method') }}</label>
							</div>
							<div class="row mb-0">
								<div class="col-md-3">
									<label class="custom-control-label custom-checkbox-label pl-0">
										<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" 
										v-model="filteredData.payment_status" :value="$configs.payment_method.invoice" />
										<span class="custom-check-label-post">{{ $configs.payment_method.invoice }}</span>
									</label>
								</div>
								<div class="col-md-3">
									<label class="custom-control-label custom-checkbox-label pl-0">
										<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" 
									v-model="filteredData.payment_status" :value="$configs.payment_method.credit" />
										<span class="custom-check-label-post">{{ $configs.payment_method.credit }}</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-2">
						<div class="col-md-12">
							<div class="col-md-12 p-0">
								<label for="入金期日">{{ $t('payment_management.invoice_date') }}</label>
							</div>
							<div class="row mb-0">
								<div class="col-lg-3  datepicker-wrapper">
									<date-picker v-model="filteredData.invoice_from_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
								<div class="col-lg-3  datepicker-wrapper similarto">
									<date-picker v-model="filteredData.invoice_to_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
							</div>
						</div>
					</div>
					<div class="row d-flex align-items-end mb-2">
						<div class="col-md-12">
							<div class="col-md-12 p-0">
								<label for="入金日">{{ $t('payment_management.payment_date') }}</label>
							</div>
							<div class="row  mb-0 date-row">
								<div class="col-md-3 datepicker-wrapper">
									<date-picker v-model="filteredData.payment_from_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
								<!-- <div class="col-lg-1 datepicker-wrapper text-center similarto" style="padding: 8px;">
								</div> -->
								<div class="col-md-3 datepicker-wrapper similarto">
									<date-picker v-model="filteredData.payment_to_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
								<div class="col-md-3 ml-auto">
									<button class="btn searchbtn float-right" @click="getData()">{{ $t('common.search') }}</button>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<label class="mb-4">{{ $t('payment_management.status') }}</label>
				<div class="status-row">
					<div class="status-col" v-for="(status, index) in record_status" :key="index">
						<label class="custom-control-label custom-checkbox-label">
							<input type="checkbox" class="custom-control-input custom-checkbox"
								:value="status.id" :checked="status.checked" v-model="filteredData.record_status" @change="getData()" />
							<span class="custom-check-label-post">{{ status.id }}</span>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 p-0">
				<div class="row">
					<div class="col-sm-6 select">
						<span>{{ $t('common.total_results') }}: {{ $tc('common.item', totalRecords, { n:totalRecords }) }}</span><br>
						<span>1 {{ $t('common.displayed_page') }}&nbsp;</span>
						<select v-model="tableData.length" @change="getData()">
							<option v-for="(records, index) in perPage" :key="index" :value="records">
								{{records}}
							</option>
						</select>
					</div>
					<div class="col-sm-6">
						<button class="btn searchbtn btn_csv_download float-right" @click="downloadCSV">{{ $t('common.csv_download') }}</button>
					</div>
				</div>
				<div class="tbl-wrap">
					<DataTable ref="datatable" :columns="$t('payment_management.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy" :totalLength="projects.total">
						<tbody>
							<tr v-for="(project, index) in projects.data" :key="project.id">
								<td class="tbl-wm">{{ project.management_number }}</td>
								<td class="tbl-wxs">{{ project.payment_method }}</td>
								<td class="tbl-ws">{{ project.invoice_number }}</td>
								<td style="position:relative;" class="tbl-ws">
									<div class="scout-box">
										<p class="scout-txt">{{ project.status }}</p>
										<p class="btn btn-common" v-on:click="showToggle(index)">
											{{$t('common.change')}}
											<span class="down-icon">&#9662;</span>
										</p>
										<div class="scout-toggle"  :id="'scout-status'+index" v-bind:class="{'scout-expand': (current === index) && (toggle_status == true)}">
											<p class="custom-radio-group mr-3"  v-for="status in getTogglableStatus(project)" v-bind:key="status.id">
												<input type="radio" :id="status.id+index" v-model="project.status" class="custion-radio" 
													@change="onStatusChange(index, $event)" :value="status.id">
												<label :for="status.id+index" class="custom-radio-lable status-lable" @click="hideToggle">{{ status.id }}</label>
											</p>
										</div>
									
									</div>
								</td>
								<td class="tbl-wxs text-right pr-2">{{ project.invoice_amount|aj-number }}</td>
								<td class="tbl-ws"><span v-show="project.invoice_date">{{ project.invoice_date|date('%Y-%m-%d') }}</span></td>
								<td class="tbl-ws">
									<span>{{ project.payment_amount|aj-number }}</span>
									<br>
									<span v-show="project.actual_payment_date">{{  project.actual_payment_date|date('%Y-%m-%d') }}</span>
									<br v-if="project.actual_payment_date">
									<button type="button" @click="editAmountDate(project)" class="btn btn-change mt-2">{{ $t('common.change') }}</button>
								</td>
								<td><router-link :to="{ name: 'recruiter-detail', params: { id: project.id }}" class="txt-vertical-ellipsis">{{ project.recruiter_name }}</router-link></td>
								<td  class="tbl-ws"><router-link :to="{ name: 'recruiter-detail', params: { id: project.id }}" class="txt-vertical-ellipsis">{{ project.incharge_name }}</router-link></td> 
								<!-- <td class="text-left">
                                    <p class="mb-1"><span class="font-weight-bold tbl-ws d-inline-block">名</span> - {{project.recruiter_name}}</p>
                                    <p class="mb-1"><span class="font-weight-bold tbl-ws d-inline-block">電話番号</span> - {{project.phone1}}</p>
                                    <p class="mb-1"><span class="font-weight-bold tbl-ws d-inline-block">メールアドレス</span> - {{project.email}}</p>
                                    <p class="mb-1"><span class="font-weight-bold tbl-ws d-inline-block">担当者名</span> - {{project.incharge_name}}</p>
                                </td> -->
								<td class="tbl-ws">
									<div style="height:40px;line-height:40px;vertical-align:middle;">
										<span class="txt-vertical-ellipsis text-left">{{ project.remark }}</span>
									</div>
									<button type="button" @click="editRemark(project)" class="btn btn-change mt-2">{{ $t('common.change') }}</button>
								</td>
							</tr>
						</tbody>
					</DataTable>
				</div>
				<pagination v-if="projects.length != 0" :data="projects" @pagination-change-page="getData" :limit="limitpc">
					<span slot="prev-nav">
						<i class="fa fa-angle-left"></i> 前へ
					</span>
					<span slot="next-nav">
						次へ <i class="fa fa-angle-right"></i>
					</span>
				</pagination>

			</div>
		</div>
		<!-- Amount/Date edit modal -->
		<transition name="modal">
		<div class="modal-mask" v-if="showModal">
		<div class="modal-wrapper">
			<div class="modal-container">
			<div class="modal-header mb-0">
				{{ $t('payment_management.payment_date') }}・{{ $t('payment_management.payment_amount') }}
				<p class="close-ico pull-right" @click="closeModal">
					<span class="icon icon-times"></span>
				</p>
			</div>
			<div class="modal-body">
				<div class="mb-2">
					<label>{{ $t('payment_management.payment_date') }}</label>
					<input type="text" v-model="form.payment_amount" @keypress="isNumber($event)" class="form-control mb-1">
				</div>				
				<label>{{ $t('payment_management.payment_amount') }}</label>
				<date-picker v-model="form.actual_payment_date" value-type="format" class="datepicker w-100" :lang="lang" 
					placeholder="年 - 月 - 日"></date-picker>
			</div>
			<div class="modal-footer">
				<button class="btn btn-comfirm" @click="onEditingComplete(form)">保存</button>
				<button class="btn" @click="closeModal">キャンセル</button>
			</div>
			</div>
		</div>
		</div>
		</transition>
	</div>
	
</template>
<script>
import DataTableServices from "../../DataTable/DataTableServices";
// import PaymentManagementInlineEditor from './PaymentManagementInlineEditor';
import { showToggle,handleStatus } from "../../../partials/common";
import { required, numeric } from "vuelidate/lib/validators";

export default {
	mixins: [ DataTableServices ],
	// components: { PaymentManagementInlineEditor },
	data() {
		let sortOrders = {};
		let columns = this.$i18n.messages.en.payment_management.columns;
		columns.forEach(column => {
			sortOrders[column.label] = -1;
		});
		return {
			current: null,
			base_url: "/v1/admin/payment-transactions",
			old_index:'',
			toggle_status:false,
			columns: columns,
			sortOrders: sortOrders,
			filteredData: {
				invoice_from_date: '',
				invoice_to_date: '',
				payment_from_date: '',
				payment_to_date: '',
				management_number: '',
				payment_status: [],
				record_status: [],
			},
			record_status: [
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
			showModal: false,
			form: {},
		}
	},
	methods: {
		generateBill(scoutid_or_applyid,payment_job_type) {
			if(payment_job_type == 'scout') {
				let url = '/v1/recruiter/scouted-list/${scoutid_or_applyid}/invoice';
			} else {
				let url = '/v1/recruiter/jobapply-list/${scoutid_or_applyid}/invoice';
			}
			this.$api.post(url, {}, { responseType: "arraybuffer" })
			.then((r) => {
					const type = r.headers["content-type"];
					const blob = new Blob([r.data], { type: type, encoding: "UTF-8" });
					const filename = r.headers["content-disposition"]
						.split("=")[1]
						.replace(/^"+|"+$/g, "");
				if (window.navigator && window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(blob, filename);  
				} else {
					const objectUrl = URL.createObjectURL(blob);
					window.open(objectUrl);
				}
			})
			.catch(error => console.log(error));
		},
		getTogglableStatus(data) {
			if (data.payment_job_type == this.$configs.payment_job_type.scout) 
			{
				return [
					{ id: this.$configs.scouts.unclaimed, checked: false },
					{ id: this.$configs.scouts.billed, checked: false },
					{ id: this.$configs.scouts.payment_confirmed, checked: false }
				];
			}
			else if (data.payment_job_type == this.$configs.payment_job_type.job_apply) 
			{
				return [
					{ id: this.$configs.job_apply.unclaimed, checked: false },
					{ id: this.$configs.job_apply.billed, checked: false },
					{ id: this.$configs.job_apply.payment_confirmed, checked: false }
				];
			} else 
			{
				return [];
			}
		},
		showToggle(index) {
			this.current = index;
			this.toggle_status = showToggle(index,this.old_index,this.toggle_status);
			this.old_index = index;
		},
		hideToggle() {
			this.toggle_status = false;
		},
		handleStatusToggle(e) {
			if(handleStatus(e.target.className) == false) 
				this.toggle_status = false;
		},
		onStatusChange(index, e) {
			const payment = this.$data.projects.data[index];
			this.$alertService.showConfirmDialog(null,this.$tc('alertMessage.change_confirm_message', e.target.value, { n:e.target.value }), this.$t('common.yes'), this.$t('common.no')) 
			.then(r => {
				if (r.value) {
					if (payment.payment_job_type == this.$configs.payment_job_type.scout)
					{
						// --scout status change
						this.$api.post('/v1/admin/scout-list/change-status', { 
							scout_id: payment.scoutid_or_applyid, 
							status: e.target.value,
						})
						.then(() => {
						})
						.catch((r) => {
							const data = r.response.data;
							this.$alertService.showErrorDialog(null,data.error.message);
						})
						.finally(() => {
							// --Rebind original status
							this.getData(this.projects.current_page);
						})
					}
					else if (payment.payment_job_type == this.$configs.payment_job_type.job_apply)
					{
						// --jobapply status change
						this.$api.post('/v1/admin/jobapply-list/change-status', {
							jobapply_id: payment.scoutid_or_applyid,
							recruiter_id: payment.recruiter_id,
							status: e.target.value,
						})
						.then(() => {
						})
						.catch((r) => {
							const data = r.response.data;
							this.$alertService.showErrorDialog(null,data.error.message);
						})
						.finally(() => {
							// --Rebind original status
							this.getData(this.projects.current_page);
						})
					}
				}
				else {
					this.getData(this.projects.current_page);
				}
				
			});
		},
		onEditingComplete(payment) {
			this.$api.put('/v1/admin/payment-transactions/'+payment.id, payment)
			.then(() => {
				let i = this.projects.data.findIndex(x => x.id == payment.id);
				if (i > -1) {
					this.projects.data[i].payment_amount = payment.payment_amount;
					this.projects.data[i].actual_payment_date = payment.actual_payment_date;
					this.projects.data[i].remark = payment.remark;
				}
				if (this.showModal) {
					this.closeModal();
				}
			})
			.catch((e) => {
				console.log(e);
			})
		}, 
		onEditingCancel($event, payment) {
			payment.payment_amount = $event.payment_amount;
			payment.actual_payment_date = $event.actual_payment_date;
			payment.remark = $event.remark;
		},
		isNumber(evt) {
			evt = (evt) ? evt : window.event;
			var charCode = (evt.which) ? evt.which : evt.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				evt.preventDefault();
				return false;
			}
			return true;
		},
		downloadCSV() {
			let jsonData = {
                tableData: this.tableData,
				filteredData: this.filteredData,
				columns: this.columns
            };
			this.$api.post("/v1/admin/payment-transactions/csv", jsonData, { responseType: "arraybuffer" })
            .then((r) => {
				const type = r.headers["content-type"];
				const blob = new Blob([r.data], { type: type, encoding: "UTF-8" });
				const filename = r.headers["content-disposition"]
					.split("=")[1]
					.replace(/^"+|"+$/g, "");
				const link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				link.download = filename;
				link.click();
            });
		},
		editRemark(payment) {
			const inputDialog = this.$swal({
				allowOutsideClick: false, 
				title: '備考',
				width: 160,
				input: 'textarea',		
				confirmButtonColor: "#EF8B1E",                       
				confirmButtonText: '保存',
				cancelButtonColor: "#aab2bd",                       
				cancelButtonText: 'キャンセル',
				customClass: {
					confirmButton: 'btn-alert',
					cancelButton: 'btn-alert'
				},
				showCloseButton: true,
				showCancelButton: true,
				inputValue: payment.remark,
			});
			inputDialog.then(r => {
				if (r.value !== undefined) {
					payment.remark = r.value;
					this.onEditingComplete(payment);
				}
			})
		},
		editAmountDate(payment) {
			// --Bind form data
			this.form = { ...payment };
			this.showModal = true;
		},
		closeModal() {
			// --Reset form data
			this.form = {};
			this.showModal = false;
		}
	},
	computed: {
		currentUser() {
			return this.$store.getters.currentUser;
		},
		totalRecords() {
			return this.$data.projects.total;
		}
	},
	validations: {
        invoiceForm: {
            default_amount: { required, numeric }
        }
	},
};
</script>
<style scoped>
textarea {
	resize: vertical;
}
.multiline-cell {
	white-space: pre;
}
.btn_csv_download {
	margin: 0px 3px;
}
/* .mw-60px {
	display: inline-block;
	min-width: 60px;
}
.mw-80px {
	display: inline-block;
	min-width: 88px;
} */
.mx-datepicker {
	width: 170px;
}
.tbl-wrap .table {
    min-width: 1000px;
}
.w-100 {
	width: 100%;
}
/* Modal added by MKK */
.modal-mask {
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 300px !important;
	margin: 0px auto;
	padding: 20px 30px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
	padding: 5px 5px !important;
}

.modal-header h3 {
	margin-top: 0;	
	color: #42b983;
}

.modal-body {
	margin: 20px 0;
}

.modal-default-button {
	float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
.modal-wrapper .btn {
	width: 100px !important;
	padding: .625em .5em !important;
	border: 0;
    border-radius: .25em;
	border-color: transparent;
    box-shadow: none;
}
.modal-wrapper .btn-comfirm {
	background: #ef8b1e;
}
.modal-wrapper .icon-times:before {
	color: #807979;
	font-weight: bold;
}
.similarto::before {
    position: absolute;
    content: "~";
    top: 0;
    left: -7px;
    font-size: 25px;
}
/* End Modal */

</style>
