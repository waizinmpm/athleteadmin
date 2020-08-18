<template>
	<div>
		<div class="row">
			<div class="col-sm-12 p-0 searchform-one">
				<h5 class="m-b-10 main-header">{{ $t('payment_management.title') }}</h5>
				<div class="content-row" style="padding-bottom:0px;">
					<div class="row">
						<div class="col-md-3">
							<label>{{ $t('payment_management.payment_method') }}</label>
							<div class="row">
							<div class="col-md-6">
								<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" 
									v-model="filteredData.payment_status" :value="$configs.payment_method.invoice" />
								<label class="custom-control-label custom-checkbox-label">{{ $configs.payment_method.invoice }}</label>
							</div>
							<div class="col-md-6">
								<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" 
								v-model="filteredData.payment_status" :value="$configs.payment_method.credit" />
								<label class="custom-control-label custom-checkbox-label">{{ $configs.payment_method.credit }}</label>
							</div>
							</div>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for="入金期日">{{ $t('payment_management.invoice_date') }}</label>
							<date-picker v-model="filteredData.invoice_from_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for></label>
							<date-picker v-model="filteredData.invoice_to_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<label>{{ $t('payment_management.status') }}</label>
							<div class="row">
								<div class="col-md-4" v-for="(status, index) in record_status" :key="index">
									<input type="checkbox" class="custom-control-input custom-checkbox"
										:value="status.id" :checked="status.checked" v-model="filteredData.record_status" />
									<label class="custom-control-label custom-checkbox-label">{{ status.id }}</label>
								</div>
							</div>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for="入金日">{{ $t('payment_management.payment_date') }}</label>
							<date-picker v-model="filteredData.payment_from_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for></label>
							<date-picker v-model="filteredData.payment_to_date" value-type="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<button class="btn searchbtn" @click="getData()">{{ $t('common.search') }}</button>
							<button class="btn searchbtn btn_csv_download" @click="downloadCSV">{{ $t('common.csv_download') }}</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12 p-0">
				<div class="row">
					<div class="col-sm-12 select text-right">
						<span>{{ $t('common.total_results') }}: {{ $tc('common.item', totalRecords, { n:totalRecords }) }}</span><br>
						<span>1 {{ $t('common.displayed_page') }}&nbsp;</span>
						<select v-model="tableData.length" @change="getData()">
							<option v-for="(records, index) in perPage" :key="index" :value="records">
								{{records}}
							</option>
						</select>
					</div>
				</div>
				<DataTable ref="datatable" :columns="$t('payment_management.columns')" :sortKey="sortKey" :showCheckbox="false" :sortOrders="sortOrders" @sort="sortBy">
					<tbody>
						<tr v-for="(project) in projects.data" :key="project.id">
							<td>{{ project.payment_job_type == $configs.payment_job_type.scout ? project.scout_management_number : project.jobapply_management_number }}</td>
							<td>{{ project.payment_method }}</td>
							<td>{{ project.invoice_number }}</td>
							<td>{{ project.payment_job_type == $configs.payment_job_type.scout ? project.scout_status : project.job_apply_status }}</td>
							<td>{{ project.invoice_amount }}</td>
							<td>{{ project.invoice_date|date('%Y-%m-%d') }}</td>
							<td>
								<PaymentManagementInlineEditor @editing-complete="onEditingComplete(project)" :original="project" 
									@editing-cancel="onEditingCancel($event, project)">
									<template #display>
										{{ project.payment_amount }}
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
									</template>
									<template #editor>
										<date-picker v-model="project.actual_payment_date" value-type="format" class="datepicker" :lang="lang" 
											placeholder="年 - 月 - 日"></date-picker>
									</template>
								</PaymentManagementInlineEditor>
							</td>
							<td>{{ project.recruiter_name }}</td>
							<td>{{ project.phone1 }}</td>
							<td>{{ project.email }}</td>
							<td>{{ project.incharge_name }}</td>
							<td>
								<PaymentManagementInlineEditor @editing-complete="onEditingComplete(project)" :original="project"
									@editing-cancel="onEditingCancel($event, project)">
									<template #display>
										<p>{{ project.remark }}</p>
									</template>
									<template #editor>
										<textarea rows="3" v-model="project.remark"></textarea>
									</template>
								</PaymentManagementInlineEditor>
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
import PaymentManagementInlineEditor from './PaymentManagementInlineEditor';

export default {
	mixins: [ DataTableServices ],
	components: { PaymentManagementInlineEditor },
	data() {
		let sortOrders = {};
		let columns = [];
		columns.forEach(column => {
			sortOrders[column.name] = -1;
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
			console.log(payment);
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
                filteredData: this.filteredData
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
};
</script>
<style>
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
</style>
