<template>
    <div class="login row justify-content-center">
            <div class="card">
                <div class="card-header">
                   <h3>Admin Registration</h3> 
                </div>
                <div class="card-body">
                    <form @submit.prevent="register" method="POST">
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
                            <div class="col-md-3">
                                <label for="password">Password</label>
                                <input type="password" name="password" class="form-control" v-model="$v.formRegister.password.$model" placeholder="password">
                                <div class="input-group" v-if="$v.formRegister.password.$dirty">
                                    <div class="error" v-if="!$v.formRegister.password.required">password required</div>
                                    <div class="error" v-if="!$v.formRegister.password.minLength">password minLength</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <input type="submit" value="Register" class="btn btn-success ml-auto">
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
                                            <td>{{ project.name }}</td>
                                            <td>{{ project.email }}</td>
                                            <td>
                                                <router-link :to="{ name: 'edit', params: { id: project.id } }" class="btn btn-info">{{ $t('common.edit')}}</router-link>
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

        /* changeStatus(id, status) {
            
            let statusVal = (status == 1? '公開': (status == 2 ? '非公開' : '停止'));
            this.$alertService.showConfirmDialog(null, this.$tc('alertMessage.change_confirm_message', statusVal, { n:statusVal }), this.$t('common.yes'), this.$t('common.no'))
            .then((dialogResult) => {
                if(dialogResult.value){
                    let statusData = {};
                    this.$set(statusData, "id", id);
                    this.$set(statusData, "status", status);
                    this.$api.post(this.base_url + `/change-status`, statusData)
                        .then(response => {
                            console.log("changeStatus", response.data);
                            //let getpage = this.projects.to > this.projects.from ? this.projects.current_page : 1;
                            this.getData(this.projects.current_page);
                        })
                        .catch(errors => {
                            console.log(errors);
                        });
                }else{
                    this.getData(this.projects.current_page);
                }
            });
        },

		showToggle(index) {
			this.current = index;
			if(this.status == true) {
                if(this.current == this.old_index)
                    this.status = false; 
			} else {
				this.status = true;
			}
			this.old_index = index;
        },
        
		hideToggle() {
			this.status = false;
		}, */
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