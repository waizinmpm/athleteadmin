<template>
	<div class="editor-container">
		<div v-show="editing == false" class="display-box">
			<slot name="display"></slot>
		</div>
		
		<div v-show="editing == true" @keyup.esc="cancelEdit" ref="editorContainer" class="edit-box">
			<slot name="editor"></slot>
		</div>		
		<div class="mt-2">
			<button v-show="editing == false" type="button" @click="beginEdit" class="btn btn-change" style="width:60px;">{{ $t('common.change') }}</button>
			<button v-show="editing == true" type="button" @click="endEdit" class="btn btn-change mr-2">{{ $t('common.confirm') }}</button>
			<button v-show="editing == true" type="button" @click="cancelEdit" class="btn btn-change">{{ $t('common.cancel') }}</button>
		</div>
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
			this.$nextTick(() => {
				this.$refs.editorContainer.children[0].focus();
			})			
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
.display-box {
	width: 170px;	
	height: 40px;
	margin: 0 auto;
	text-align: center;
	vertical-align: middle;
    line-height: 40px;
}

.edit-box {
	width: 170px;
	height: 40px;
	margin: 0 auto;
}
.txt-edit {
	width: 100%;
	height: 100%;
	padding: 0 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.btn-change {
	width: 80px;
}
	/* .editor-container {
		display: flex;
		align-content: space-around;
		align-items: baseline;
	}
	.editor-container * {
		max-width: 100px;
		padding: 3px;
	} */




</style>