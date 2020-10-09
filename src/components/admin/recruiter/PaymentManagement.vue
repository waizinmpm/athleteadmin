<template>
	<div>
		<div class="row">
			<div class="col-sm-12 p-0 searchform-one">
				<h5 class="m-b-10 main-header">{{ $t('payment_management.title') }}</h5>
				<div class="inner-wrapper">
					<div class="row mb-1">
						<div class="col-md-7">
							<div class="col-md-12 p-0">
								<label>{{ $t('payment_management.payment_method') }}</label>
							</div>
							<div class="row mb-0">
								<div class="col-md-4">
									<label class="custom-control-label custom-checkbox-label">
										<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" 
										v-model="filteredData.payment_status" :value="$configs.payment_method.invoice" />
										<span class="custom-check-label-post">{{ $configs.payment_method.invoice }}</span>
									</label>
								</div>
								<div class="col-md-4">
									<label class="custom-control-label custom-checkbox-label">
										<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" 
									v-model="filteredData.payment_status" :value="$configs.payment_method.credit" />
										<span class="custom-check-label-post">{{ $configs.payment_method.credit }}</span>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div class="row mb-2">
						<div class="col-md-7">
							<div class="col-md-12 p-0">
								<label for="入金期日">{{ $t('payment_management.invoice_date') }}</label>
							</div>
							<div class="row mb-0">
								<div class="col-lg-6  datepicker-wrapper">
									<date-picker v-model="filteredData.invoice_from_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
								<div class="col-lg-6  datepicker-wrapper">
									<date-picker v-model="filteredData.invoice_to_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
							</div>
						</div>
					</div>
					<div class="row d-flex align-items-end mb-2">
						<div class="col-md-7">
							<div class="col-md-12 p-0">
								<label for="入金日">{{ $t('payment_management.payment_date') }}</label>
							</div>
							<div class="row  mb-0">
								<div class="col-md-6 datepicker-wrapper">
									<date-picker v-model="filteredData.payment_from_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
								<div class="col-md-6 datepicker-wrapper">
									<date-picker v-model="filteredData.payment_to_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
								</div>
							</div>
						</div>
						<div class="col-md-3 ml-auto">
							<button class="btn searchbtn  mr-2" @click="getData()">{{ $t('common.search') }}</button>
						</div>
					</div>
				</div>
				<label class="mb-4">{{ $t('payment_management.status') }}</label>
				<div class="row">
					<div class="col-md-12">
						<div class="col-md-2 p-lr0" v-for="(status, index) in record_status" :key="index">
							<label class="custom-control-label custom-checkbox-label">
								<input type="checkbox" class="custom-control-input custom-checkbox"
									:value="status.id" :checked="status.checked" v-model="filteredData.record_status" @change="getData()" />
								<span class="custom-check-label-post">{{ status.id }}</span>
							</label>
						</div>
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
					<DataTable ref="datatable" :columns="$t('payment_management.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy">
						<tbody>
							<tr v-for="(project) in projects.data" :key="project.id">
								<td>{{ project.management_number }}</td>
								<td>{{ project.payment_method }}</td>
								<td>{{ project.invoice_number }}</td>
								<td>{{ project.status }}</td>
								<td>{{ project.invoice_amount|aj-number }}</td>
								<td><span v-show="project.invoice_date">{{ project.invoice_date|date('%Y-%m-%d') }}</span></td>
								<td>
									<PaymentManagementInlineEditor @editing-complete="onEditingComplete(project)" :original="project" 
										@editing-cancel="onEditingCancel($event, project)">
										<template #display>
											<span class="mw-60px">{{ project.payment_amount|aj-number }}</span>
										</template>
										<template #editor>
											<input type="text" v-model="project.payment_amount" @keypress="isNumber($event)">
										</template>
									</PaymentManagementInlineEditor>
								</td>
								<td>
									<PaymentManagementInlineEditor @editing-complete="onEditingComplete(project)" :original="project"
										@editing-cancel="onEditingCancel($event, project)">
										<template #display>
											<span v-show="project.actual_payment_date">{{  project.actual_payment_date|date('%Y-%m-%d') }}</span>
											<span class="mw-80px" v-show="!project.actual_payment_date"></span>
										</template>
										<template #editor>
											<date-picker v-model="project.actual_payment_date" value-type="format" class="datepicker" :lang="lang" 
												placeholder="年 - 月 - 日"></date-picker>
										</template>
									</PaymentManagementInlineEditor>
								</td>
								<!-- <td>{{ project.recruiter_name }}</td>
								<td>{{ project.phone1 }}</td>
								<td>{{ project.email }}</td>
								<td>{{ project.incharge_name }}</td> -->
								<td class="text-left">
                                    <p><span class="font-weight-bold tbl-ws d-inline-block">名</span> - {{project.recruiter_name}}</p>
                                    <p><span class="font-weight-bold tbl-ws d-inline-block">電話番号</span> - {{project.phone1}}</p>
                                    <p><span class="font-weight-bold tbl-ws d-inline-block">メールアドレス</span> - {{project.email}}</p>
                                    <p><span class="font-weight-bold tbl-ws d-inline-block">担当者名</span> - {{project.incharge_name}}</p>
                                </td>
								<td class="tbl-ws">
									<span style="white-space: pre-wrap;">{{ project.remark }}</span>
									<button type="button" @click="editRemark(project)">{{ $t('common.change') }}</button>
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
						次へ <i class="fas fa-angle-right"></i>
					</span>
				</pagination>

			</div>
		</div>
	</div>
</template>
<script>
import DataTableServices from "../../DataTable/DataTableServices";
import PaymentManagementInlineEditor from './PaymentManagementInlineEditor';

export default {
	mixins: [ DataTableServices ],
	components: { PaymentManagementInlineEditor },
	data() {
		let sortOrders = {};
		let columns = this.$i18n.messages.en.payment_management.columns;
		columns.forEach(column => {
			sortOrders[column.label] = -1;
		});
		return {
			current: null,
			base_url: "/v1/admin/payment-transactions",
			columns: columns,
			sortOrders: sortOrders,
			filteredData: {
				invoice_from_date: '',
				invoice_to_date: '',
				payment_from_date: '',
				payment_to_date: '',
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
		}
	},
	methods: {
		onEditingComplete(payment) {
			this.$api.put('/v1/admin/payment-transactions/'+payment.id, payment)
			.then(() => {
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
				title: null,
				width: 360,
				input: 'textarea',		
				confirmButtonColor: "#ffb700",                       
				confirmButtonText: this.$t('common.confirm'),
				cancelButtonColor: "#0062ff",                       
				cancelButtonText: this.$t('common.cancel'),
				customClass: {
					confirmButton: 'border-style',
					cancelButton: 'cancelbtn border-style'
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
	},
	computed: {
		currentUser() {
			return this.$store.getters.currentUser;
		},
		totalRecords() {
			return this.$data.projects.total;
		}
	},
};
</script>
<style scoped>
.custom-checkbox-label {
	padding-left: 0px;
}
textarea {
	resize: vertical;
}
.multiline-cell {
	white-space: pre;
}
.btn_csv_download {
	margin: 0px 3px;
}
.mw-60px {
	display: inline-block;
	min-width: 60px;
}
.mw-80px {
	display: inline-block;
	min-width: 88px;
}
</style>
