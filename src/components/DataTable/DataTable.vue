<template>
    <div class="data_table">
        <table class="table is-bordered data-table table-bordered">
            <thead>
                <tr>
                    <th v-if="showCheckbox" v-show="this.$route.name == 'job-list'">
                        <input type="checkbox" @click="emitToParent" v-model="checkornot" /> 
                    </th>
                    <th v-for="column in columns" :key="column.id" @click="$emit('sort', column.label)"
                        :class="sortKey === column.label ? (sortOrders[column.label] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
                        :style="'width:'+column.width+';'+'cursor:pointer;'">
                        {{column.name}}
                    </th>
                </tr>
            </thead>
            <slot></slot>
        </table>
        <div v-if="totalLength === 0">
            <p class="no-data-txt-border">{{ $t('common.no_data_found')}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: ["columns", "sortKey", "sortOrders", "removeChecked", 'showCheckbox', 'totalLength'],
    data() {
            return {
               checkornot:false,
            }
        },
    watch:{
        'columns'(){
        }
    },
    methods: {
        emitToParent() {
            if (this.checkornot == false) {
                this.checkornot = true;
            } else {
                this.checkornot = false;
            }
            this.$emit("check-all", this.checkornot);
        },
        uncheck() {
            this.checkornot = false;
            // console.log(this.checkornot);
        }
    }
};
</script>
<style scoped>
.table-bordered {
    border: none;
}
.table {
    border-collapse: separate;
    color: inherit;
}
.table>tbody>tr>td , 
.table-bordered>thead>tr>th {
    text-align: center;
    vertical-align: middle;
}
.table .check-col {
    width: 40px;
    text-align: center;
}
.no-data-txt-border {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 99.7%;
    margin: -20px auto 0;
    padding: 50px 0 !important;
    font-weight: bold;
    font-size: 16px;
    color: #84BE3F;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top: 0;
}
</style>