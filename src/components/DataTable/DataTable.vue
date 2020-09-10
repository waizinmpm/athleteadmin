<template>
    <table class="table is-bordered data-table table-bordered">
        <thead>
            <tr>
               <th v-if="showCheckbox">
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
</template>
<script>
export default {
    props: ["columns", "sortKey", "sortOrders", "removeChecked", 'showCheckbox'],
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
    width: 30px;
    text-align: center;
}
</style>