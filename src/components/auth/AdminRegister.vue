<template>
    <div class="login row justify-content-center">
            <div class="card">
                <div class="card-header">
                   <h3>Admin Registration</h3> 
                </div>
                <div class="card-body">
                    <form method="POST">
                        <div class="form-group row">
                            <div class="col-md-3">
                                <label for="name">Name</label>
                                <input type="text" name="name" class="form-control"  v-model="$v.formRegister.name.$model" placeholder="Name">
                                <div class="input-group" v-if="$v.formRegister.name.$dirty">
                                    <div class="error" v-if="!$v.formRegister.name.required">name required</div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="email">Email</label>
                                <input type="email" name="email" class="form-control" v-model="$v.formRegister.email.$model" placeholder="Email address">
                                <div class="input-group" v-if="$v.formRegister.email.$dirty">
                                    <div class="error" v-if="!$v.formRegister.email.required">メールアドレスは必須です</div>
                                    <div class="error" v-if="!$v.formRegister.email.email">※メールアドレスが正しくありません。もう一度入力してください。</div>
                                    <div class="error" v-if="!$v.formRegister.email.isUnique">メールアドレスは、すでに使われています</div>
                                </div>
                            </div>
                            <div class="col-md-3" v-if="edit_id == 0">
                                <label for="password">Password</label>
                                <input type="password" name="password" class="form-control" v-model="$v.formRegister.password.$model" placeholder="password">
                                <div class="input-group" v-if="$v.formRegister.password.$dirty">
                                    <div class="error" v-if="!$v.formRegister.password.required">password required</div>
                                    <div class="error" v-if="!$v.formRegister.password.minLength">password minLength</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <input type="button" value="Register" class="btn btn-success ml-auto" @click="register" v-if="edit_id == 0">
                            <input type="button" value="Cancel" class="btn btn-success ml-auto" @click="cancel" v-if="edit_id != 0">
                            <input type="button" value="Update" class="btn btn-success ml-5" @click="update" v-if="edit_id != 0">
                        </div>
                    </form>

                    <h3>Admin Listing</h3> 
                    <div class="row">
                        <div class="col-md-6">
                        <div class="input-group">
                            <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('jobseeker_list.search_jobseeker_placeholder')"
                            id="inputGroup"
                            v-model="filteredData.freeword"
                            />
                            <span class="input-group-addon bg-primary"  @click="getData()">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 p-0">
                            <div class="row">
                                <div class="col-sm-6 select">
                                    <div for>{{ $t('common.total_results') }}: {{ $tc('common.item', projects.total, { n:projects.total }) }}</div>
                                    <span>{{ projects.current_page }}{{ $t('common.displayed_page') }}</span>&nbsp;
                                    <select v-model="tableData.length" @change="getData()">
                                        <option
                                            v-for="(records, index) in perPage"
                                            :key="index"
                                            :value="records"
                                        >{{records}}</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    <button
                                        class="btn custom-btn float-right"
                                        :disabled="isDisabled"
                                        @click="deleteData()"
                                    >{{ $t('common.delete') }}</button>
                                </div>
                            </div>
                            
                            <div class="vld-parent" style="width: 100%;" ref="loadingRef">
                                <DataTable
                                    ref="datatable"
                                    :columns="$t('admin_list.columns')"
                                    :sortKey="sortKey"
                                    :sortOrders="sortOrders"
                                    @check-all="selectAll"
                                    @sort="sortBy"
                                    :showCheckbox="true"
                                >
                                    <tbody>
                                        <tr v-for="project in projects.data" :key="project.id">
                                            <td>
                                                <label class="form-checkbox">
                                                    <input type="checkbox" :value="project.id" v-model="selected" />
                                                    <div v-if="project.id == current_admin_id">current</div>
                                                </label>
                                            </td>
                                            <td>{{ project.name }}
                                            </td>
                                            <td>{{ project.email }}</td>
                                            <td>
                                                <button type="button" @click="editAdmin(project.id, project.name, project.email)" class="btn btn-info">{{ $t('common.edit')}}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </DataTable>
                            </div>
                            <pagination
                                v-if="projects.length != 0"
                                :data="projects"
                                @pagination-change-page="getData"
                                :limit="limitpc"
                            >
                                <span slot="prev-nav">
                                    <i class="fas fa-angle-left"></i> 前へ
                                </span>
                                <span slot="next-nav">
                                    次へ
                                    <i class="fa fa-angle-right"></i>
                                </span>
                            </pagination>
                        </div>
                    </div>
                </div>
            </div>
        
    </div>
</template>

<script>
import {registerUser} from '../../partials/auth';
import DataTableServices from "../DataTable/DataTableServices";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
    mixins: [DataTableServices],
    data(){
        let sortOrders = {};
        let columns = this.$i18n.messages.en.admin_list.columns;
        columns.forEach(column => {
            sortOrders[column.label] = -1;
        });
        let filteredData = {
            status: []
        };
        return {
            edit_id : 0,
            current_admin_id: this.$store.getters.currentUser.id,
            base_url: "v1/admin/admin-list",
            columns: columns,
            sortOrders: sortOrders,
            filteredData: filteredData,
            current: null,
            old_index:'',
            status:false,
            arr_status: [
				{ id: this.$configs.job.public, checked: false },
				{ id: this.$configs.job.private, checked: false },
				{ id: this.$configs.job.stopped, checked: false },
            ],
            formRegister: {
                name: '',
                email: '',
                password: ''
            },
        };
    },

    validations: {
        formRegister: {
            name:{ required },
            email: {
                    required,
                    email,
                    isUnique(value) {
                        if (value === '') return true;
                        return new Promise((resolve, reject) => {
                            this.$api.post('/v1/jobseeker/mail-unity', {
                                email: value
                            })
                            .then(res => {
                                resolve(res);
                            })
                            .catch(err => {
                                if (err.response.status == 422)
                                    reject(err);
                                else 
                                    resolve(err);
                            })
                        })
                    },
                },
            password: {required, minLength: minLength(8)}
        },
    },

    methods:{
        register(){
            this.$v.formRegister.$touch();
            if (this.$v.formRegister.$invalid) {
                return;
            }
            registerUser(this.$data.formRegister)
            .then(res => {
                this.$store.commit("registerSuccess", res);
                this.getData();
                this.$v.formRegister.$reset();
                this.formRegister.name = this.formRegister.email = this.formRegister.password = '';
                
            })
            .catch(error => {
                this.$store.commit("registerFailed", {error});
            })
        },
        
        editAdmin(id, name, email) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            this.edit_id = id;
            this.formRegister.name  = name;
            this.formRegister.email = email;
        },

        cancel() {
            this.edit_id = 0;
            this.formRegister.name  = '';
            this.formRegister.email = '';
        },

        update(){
            this.$v.formRegister.$touch();
            if (this.$v.formRegister.name.$invalid || this.$v.formRegister.email.$invalid) {
                return;
            }
            let updateAdmin = {};
            this.$set(updateAdmin, "id", this.edit_id);
            this.$set(updateAdmin, "name", this.formRegister.name);
            this.$set(updateAdmin, "email", this.formRegister.email);
            console.log(updateAdmin);
            this.$api.post(this.base_url + `/update`, updateAdmin)
            .then(() => {
                this.getData();
                this.$v.formRegister.$reset();
                this.formRegister.name = this.formRegister.email = this.formRegister.password = '';
                
            })
            .catch(error => {
                this.$store.commit("registerFailed", {error});
            })
        },
    },

    computed:{
        regError(){
            return this.$store.getters.regError
        },

        isDisabled() {
            //if dont select any row, set disable delete button
            return this.selected.length > 0 ? false : true;
        },
    }
}
</script>

<style scoped>
.error{
    text-align: center;
    color: red;
}
</style>