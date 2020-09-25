<template>
    <div :class="['modal fade in', showModel ? 'modal-active' : 'modal-close' ]">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header pt-4">
                    <button type="button" @click="closeModal" class="close"><span >&times;</span></button>
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer pb-4">
                    <button class="btn btn-info" @click="closeModal">{{ $t('common.cancel') }}</button>
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            showModel:false
        }
    },
    methods: {
        showModal(){
            this.showModel = true;
        },
        closeModal(){
            this.showModel = false;
        },
    }
}
</script>

<style scoped>
.modal{
    overflow: auto; 
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-dialog {
    width: 60%;
    margin-top: 5rem;
}

.modal-active{
	display:block;
}
</style>