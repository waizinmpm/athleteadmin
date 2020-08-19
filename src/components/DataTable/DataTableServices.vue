
<script>
export default {
    props: {
        limitpc: {
            type: Number,
            default: 5
        }
    },

    data() {
        return {
            page: {
                default: 1,
                type: Number
            },

            selected: [],
            parentChecked: false,
            projects: [],
            sortKey: "deadline",
            perPage: ["5", "10", "20", "30"],
            tableData: {
                draw: 0,
                length: 5,
                column: 0,
                dir: "desc"
            },
            pagination: {
                lastPage: "",
                currentPage: "",
                total: "",
                lastPageUrl: "",
                nextPageUrl: "",
                prevPageUrl: "",
                from: "",
                to: ""
            }
        };
    },
    mounted() {
        this.getData();
    },

    methods: {
        getData(page) {
            this.selectAll();
            this.tableData.draw++;
            var jsonData = {
                tableData: this.tableData,
                filteredData: this.filteredData
            };
            page = page ?? 1;
            this.$api
                .post(this.base_url + "?page=" + page, jsonData)
                .then(response => {
                    // console.log("return", response.data);
                    this.projects = response.data;
                    this.checkedAll = false;
                })
                .catch(errors => {
                    console.log(errors);
                });
        },

        deleteData() {
            if(this.selected.length > 0){
                this.$alertService
                .showConfirmDialog(null, this.$t('common.delete_confirm_message'), this.$t('common.yes'), this.$t('common.no'))
                .then((dialogResult) => {
                    if(dialogResult.value){
                        let checkedData = {};
                        this.$set(checkedData, "checked_data", this.selected);
                        this.$api.post(this.base_url + "/delete", checkedData)
                            .then(response => {
                                console.log("delete", response.data);
                                let getpage = 1;
                                if ((this.projects.to - this.selected.length + 1) > this.projects.from) {
                                    getpage = this.projects.current_page;
                                } else {
                                    getpage = this.projects.current_page - 1;
                                }
                                this.getData(getpage);
                            })
                            .catch(errors => {
                                console.log(errors);
                            });
                    }
                });
            } 
        },

        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            this.tableData.column = (this.getIndex(this.columns, "name", key) + 1);
            // add plus 1 to get key0 as a initial state sorting
            this.tableData.dir = this.sortOrders[key] === 1 ? "asc" : "desc";
            this.getData();
        },
        getIndex(array, key, value) {
            return array.findIndex(i => i[key] == value);
        },
        selectAll: function(payload) {
            this.selected = [];
            if (payload) {
                for (let i in this.projects.data) {
                    this.selected.push(this.projects.data[i].id);
                }
            } else {
                this.$refs.datatable.uncheck();
                this.selected = [];
            }
        }
    }
};
</script>