<template>
    <table class="table is-bordered data-table">
        <thead>
            <tr>
            
               <th>
               <input type="checkbox" @click="emitToParent" v-model="checkornot" />
               </th>
                <th v-for="column in columns" :key="column.name" @click="$emit('sort', column.name)"
                    :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
                    :style="'width:'+column.width+';'+'cursor:pointer;'">
                    {{column.label}}
                </th>
            </tr>
        </thead>
        <slot></slot>
    </table>
</template>

<script>
    export default {
        
        props: ['columns', 'sortKey', 'sortOrders','removeChecked'],
        data() {
            return {
               checkornot:false,
            }
        },
        watch:{
            'columns'(){
                console.log('a');

            }
        },
      
        methods:{
            
            emitToParent(){
               if(this.checkornot == false)
               {
                   this.checkornot = true;
               }
               else{
                   this.checkornot = false;
               }
                this.$emit('check-all',this.checkornot)
            },
            uncheck()
            {
                this.checkornot = false;
                // console.log(this.checkornot);
            }
        }
    }
</script>
