<template>
	<!-- ATH'team component which customed by zayarpn@19/5/2021 -->
	<div :class="[containerClassName]">
        <!-- Year -->
		<div :class="[selectWrapperClassName]" class="date-box">
			<select v-model="selectedYear" @change="updateDays()" :class="[selectClassName, selectYearClassName]">
				<option value="">年</option>
				<option v-for="year in years" :key="year.year" :value="year.year">
					{{ year.year }}
				</option>
			</select>
             <span class="datedropdown">年</span>
		</div>

		<!-- Month -->
		<div :class="[selectWrapperClassName]" class="date-box">
			<select v-model="selectedMonth" @change="updateDays()" :class="[selectClassName, selectMonthClassName]">
				<option value="">月</option>
				<option v-for="(month, index) in months" :value="index" :key="month.month">
					{{ month.month }} 
				</option>
			</select>
             <span class="datedropdown">月</span>
		</div>

		<!-- Day -->
		<div :class="[selectWrapperClassName]" class="date-box">
			<select v-model="selectedDay" :class="[selectClassName, selectDayClassName]">
				<option value="">日</option>
				<option v-for="day in days" :key="day.day" :value="day.day">
					{{ day.day }} 
				</option>
			</select>
             <span class="datedropdown">日</span>
		</div>
	</div>
</template>

<script>
	const defaultMonths = {
		0: 'January',
		1: 'February',
		2: 'March',
		3: 'April',
		4: 'May',
		5: 'June',
		6: 'July',
		7: 'August',
		8: 'September',
		9: 'October',
		10: 'November',
		11: 'December'
	}
	export default {
		name: "DateDropdown",
		props: {
			default: {
				type: String,
				required: false
			},
			value: {
				type: String
			},
			min: {
				type: String,
				required: false
			},
			max: {
				type: String,
				required: false
			},
			monthsNames: {
				type: String,
				required: false
			},
			selectClassName: {
				type: String,
				required: false,
				default: 'date-dropdown-select'
			},
			selectDayClassName: {
				type: String,
				required: false,
				default: 'day'
			},
			selectMonthClassName: {
				type: String,
				required: false,
				default: 'month'
			},
			selectYearClassName: {
				type: String,
				required: false,
				default: 'year'
			},
			selectWrapperClassName: {
				type: String,
				required: false,
				default: 'date-dropdown-select-wrapper'
			},
			containerClassName: {
				type: String,
				required: false,
				default: 'date-dropdown-container'
			},
		},
		data () {
			return {
				days: [],
				selectedDay: '',
				selectedMonth: '',
				selectedYear: ''
			}
		},
		computed: {
			// Returns if there are default date settings.
			initialDate() {
				return !! (this.default || this.min)
			},
			// The date property, converted to a date.
			specifiedDate() {
				return new Date(this.default)
			},
			// The minimum date the will allow user to select.
			minDate() {
				// if (this.min)
				// 	return new Date(this.min)
				return new Date(this.min)
			},
			// The maximum date the will allow user to select.
			maxDate() {
				// if (this.max)
				// 	return new Date(this.max)
				return new Date(this.max)
			},
			// Returns a formatted date e.g. 01.02.2018. (change format into YYYY-mm-dd by zayarpn@19/5/2021)
			calculatedDate() {
				let day = this.selectedDay >= 10 ? this.selectedDay : `0${this.selectedDay}`
				let month = this.selectedMonth + 1 >= 10 ? this.selectedMonth + 1 : `0${this.selectedMonth + 1}`

				day  = this.selectedDay || '00' // set day as 00 if selected default option
				if(this.selectedMonth === '') month = '00' // set month as 00 if selected default option
				let year  = this.selectedYear || '0000' // set month as 0000 if selected default option

				if(this.selectedYear === '' && this.selectedMonth === '' && this.selectedDay === '')
					return null
				else
					return `${year}-${month}-${day}`
			},
			// The alternative names of months
			dividedNamesOfMonths() {
				if (this.monthsNames)
					return this.monthsNames.replace(/\s/g, '').split(',')
				return true
			},
			// Computes a list of month.
			months() {
				let months = []
				for (let i = 0; i < 12; i++) {
					if (this.dividedNamesOfMonths)
						months.push(this.dividedNamesOfMonths[i])
					else
						months.push(defaultMonths[i])
				}
				return months.map((month, index) => {
					return { month, selected: index === this.selectedMonth }
				})
			},
			// Computes a list of years.
			years() {
				// Set the first year of the array.
				let firstYear
				if (this.min) {
					firstYear = this.minDate.getFullYear()
				} else if (this.default) {
					firstYear = this.specifiedDate.getFullYear()
				} else {
					firstYear = (new Date).getFullYear()
				}
				// Create a range of years to loop through which is either the maximum
				// date minus the first year, or simply 100.
				let through = this.max ? (this.maxDate.getFullYear() + 1) - firstYear : 101
				let years = []
				for (let i = firstYear, len = firstYear + through; i < len; i++)
					years.push(i)
				return years.map((year) => {
					return { year, selected: year === this.selectedYear }
				})
			}
		},
		methods: {
			getDays() {
				let days = []
				let daysNumberOfMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate()
				for (let i = 1; i < daysNumberOfMonth + 1; i++)
					days.push(i)
				return days.map((day) => {
					return { day, selected: days === this.selectedDay }
				})
			},
			updateDays() {
				this.days = this.getDays()
			},
			// Send data to upper component.
			sendDate() {
				const date = this.format ? this.format(this.calculatedDate) : this.calculatedDate
				this.$emit('input', date)
			},
			// Set the initial date.
			setDate() {
				this.updateDays()
				// If a value property has been passed to the component, that will be
				// used instead of the current day.
				let date
				if (this.min && this.max && !this.default) {
					date = new Date(this.min)
				} else if (this.default) {
					date = new Date(this.default)
				} else {
					date = new Date()
				}
				if (this.initialDate)
					this.selectedDay = date.getDate() + 1
				else
					this.selectedDay = date.getDate()

				// select default option when value is null
				this.selectedDay 	= this.value == null ? '' : date.getDate()
				this.selectedMonth 	= this.value == null ? '' : date.getMonth()
				this.selectedYear 	= this.value == null ? '' : date.getFullYear()
				this.sendDate()
			}
		},
		created() {
			// Set the date when the component was created
			this.setDate()
		},
		updated() {
			// Send the data on change
			this.sendDate()
		},
	}
</script>

<style scoped>
	.date-box {
		display: flex;
		align-items: center;
		width: 33.3%;
	}
	.date-dropdown-container {
		display: flex;
	}
	.date-dropdown-select {
		width: 75%;
		display: inline-block;
		border: 1px solid #e0e0e0;
		border-radius: 3px;
		padding: 8px;
		margin-right: 10px;
	}
    .datedropdown{
		width: 25%;
        margin: 0 5px;
	}
	@media(max-width: 390px){
		.date-dropdown-select{
			margin-right: 0px;
			padding: 6px 0px;
		}
		.datedropdown{
			margin-right: 3px;
		}
	}
	@media(max-width: 420px){
		.date-dropdown-select{
			margin-right: 0px;
		}
	}
</style>