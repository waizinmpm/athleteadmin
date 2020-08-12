<template>
	<div class="editor-container">
		<div v-show="editing == false">
			<slot name="display"></slot>
		</div>
		<button v-show="editing == false" type="button" @click="beginEdit">{{ $t('common.edit') }}</button>
		<div v-show="editing == true">
			<slot name="editor"></slot>
		</div>		
		<button v-show="editing == true" type="button" @click="endEdit">{{ $t('common.confirm') }}</button>
		<button v-show="editing == true" type="button" @click="cancelEdit">{{ $t('common.cancel') }}</button>
	</div>
</template>
<script>
export default {
	name: 'PaymentManagementInlineEditor',
	props: {
		original: Object
	},
	data() {
		return {
			old: { ...this.original },
			editing: false,
		}
	},
	methods: {
		beginEdit() {
			this.editing = true;
		},
		endEdit() {
			this.editing = false;
			this.$emit('editing-complete');
		},
		cancelEdit() {
			this.editing = false;
			this.$emit('editing-cancel', this.old);
		}
	}
}
</script>
<style scoped>
	.editor-container {
		display: flex;
		align-content: space-around;
	}
	.editor-container * {
		max-width: 100px;
		margin: 0px 3px;
		padding: 0px 3px;
	}
</style>