<template>
	<div>
		<div class="row">
			<div class="col-sm-12 p-0 searchform-one">
				<h5 class="m-b-10 main-header">手数料入金管理</h5>
				<div class="content-row" style="padding-bottom:0px;">
					<div class="row">
						<div class="col-md-3">
							<label>請求方法</label>
							<div class="row">
							<div class="col-md-6">
								<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" />
								<label class="custom-control-label custom-checkbox-label">請求書</label>
							</div>
							<div class="col-md-6">
								<input type="checkbox" name="scout-status" class="custom-control-input custom-checkbox" />
								<label class="custom-control-label custom-checkbox-label">クレカ</label>
							</div>
							</div>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for="スカウト日時">{{ $t('scouted_list.scout_date') }}</label>
							<date-picker valuetype="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for></label>
							<date-picker valuetype="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<label>ステータス</label>
							<div class="row">
								<div class="col-md-4" v-for="(status, index) in record_status" :key="index">
									<input type="checkbox" class="custom-control-input custom-checkbox"
										:value="status.id" :checked="status.checked" v-model="filteredData.record_status" />
									<label class="custom-control-label custom-checkbox-label">{{ status.id }}</label>
								</div>
							</div>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for="スカウト日時">入金日</label>
							<date-picker valuetype="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
						<div class="col-md-3 datepicker-wrapper">
							<label for></label>
							<date-picker valuetype="format" class="datepicker" :lang="lang" placeholder="年 - 月 - 日"></date-picker>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<button class="btn searchbtn">{{ $t('common.search') }}</button>
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
						<tr v-for="(project, index) in projects.data" :key="project.id">
							<td>{{ project.payment_job_type == $configs.payment_job_type.scout ? project.scout_management_number : project.jobapply_management_number }}</td>
							<td>{{ project.payment_method }}</td>
							<td>{{ project.invoice_number }}</td>
							<td>{{ project.payment_job_type == $configs.payment_job_type.scout ? project.scout_status : project.job_apply_status }}</td>
							<td>{{ project.invoice_amount }}</td>
							<td>{{ project.invoice_date|date('%Y-%m-%d') }}</td>
							<td>{{ project.payment_amount }}</td>
							<td>{{ project.actual_payment_date|date('%Y-%m-%d') }}</td>
							<td>{{ project.recruiter_name }}</td>
							<td>{{ project.phone1 }}</td>
							<td>{{ project.email }}</td>
							<td>{{ project.incharge_name }}</td>
							<td style="width: 200px;">
								{{ project.remark }} {{ index }}
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
	mixins: [ DataTableServices ],
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
			filteredData:{
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
</style>