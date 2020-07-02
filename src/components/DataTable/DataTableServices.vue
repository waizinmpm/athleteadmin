
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

            this.$api
                .post(this.base_url + "?page=" + page, jsonData)
                .then(response => {
                    console.log("return",response.data)
                    this.projects = response.data;
                    this.checkedAll = false;
                })
                .catch(errors => {
                    console.log(errors);
                });
        },

        deleteData() {
            this.$api
                .post(this.base_url + '/delete', this.selected)
                .then(response => {
                    console.log(response.data);
                    this.getData();
                })
                .catch(errors => {
                    console.log(errors);
                });
        },

        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            this.tableData.column = this.getIndex(this.columns, "name", key);
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