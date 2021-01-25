<template>
  <div>
    <h2 class="user-head-tit">{{ $t('jobcreate.title') }}</h2>
    <div class="content-wrap">
        <form @submit.prevent="jobpostcreate">
            <div class="row m-0">
                <div class="col-md-12 form-bordered">
                    <!-- <div class="row form-bottom-bordered">
                        <div class="col-md-4 form-left-block text-center">
                            <label for="name">{{ $t('jobcreate.title2') }}</label>
                        </div>
                        <div class="col-md-7 d-flex form-right-block">
                            <p class="custom-radio-group form-paragraph">
                            <input
                                type="radio"
                                id="companyname"
                                name="gender"
                                class="custion-radio"
                                value="正式名称で表示"
                                v-model="formRegister.recruiter_show_name"
                            />
                            <label
                                for="companyname"
                                class="custom-radio-lable"
                            >{{ $t('jobcreate.com_name') }}</label>
                            </p>
                            <p class="custom-radio-group ml-4 form-paragraph">
                            <input
                                type="radio"
                                id="nickname"
                                name="gender"
                                class="custion-radio"
                                value="愛称で表示"
                                v-model="formRegister.recruiter_show_name"
                            />
                            <label
                                for="nickname"
                                class="custom-radio-lable"
                            >{{ $t('jobcreate.nick_name') }}</label>
                            </p>
                        </div>
                    </div> -->

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">求人タイトル</label>
                            <span class="required">必須</span>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea :class="['form-control',$v.formRegister.title.$error?'is-invalid':'']" rows="3"  v-model="$v.formRegister.title.$model"></textarea>
                            <div v-if="$v.formRegister.title.$dirty">
                                <span v-if="!$v.formRegister.title.required" style="color:red;">求人タイトルは必須です</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name" style="line-height: 22px;">
                            {{ $t('jobcreate.occupation') }}
                            <br />
                            {{ $t('jobcreate.occupation_ex') }}
                            </label>
                            <div class="pl-3">
                            <ol>
                                <li>{{ $t('jobcreate.occupation_ex1') }}</li>
                                <li>{{ $t('jobcreate.occupation_ex2') }}</li>
                                <li class="list-unstyled">{{ $t('jobcreate.occupation_ex3') }}</li>
                            </ol>
                            </div>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea
                            class="form-control"
                            id="occupation_description"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.occupation_description"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>職種(記入例)</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">{{ $t('jobcreate.Employment_status') }}</label>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <div class="row col-12 p-0 m-0">
                            <div class="col-md-4" v-for="(result, index) in employment_types" :key="result.id">
                                <input
                                type="checkbox"
                                v-bind:value="result.employment_type_name"
                                v-bind:id="result.employment_type_name"
                                class="custom-control-input custom-checkbox"
                                v-model="formRegister.employment_types"
                                />
                                <label
                                :for="result.employment_type_name"
                                class="custom-control-label custom-checkbox-label"
                                >{{$t('jobcreate.employment_type['+ index+']')}}</label>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">
                            {{ $t('jobcreate.Job_Description') }}
                            <br />
                            {{ $t('jobcreate.Job_Description_ex1') }}
                            </label>
                            <div class="pl-3">
                            <ol>
                                <li>{{ $t('jobcreate.Job_Description_ex2') }}</li>

                                <li>{{ $t('jobcreate.Job_Description_ex3') }}</li>
                            </ol>
                            </div>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea
                            class="form-control"
                            id="job_description"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.job_description"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>仕事内容</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">
                            {{ $t('jobcreate.Qualification') }}
                            <br />
                            {{ $t('jobcreate.Qualification_ex1') }}
                            </label>
                            <!-- <p>
                            {{ $t('jobcreate.Qualification_ex2') }}
                            <br />
                            {{ $t('jobcreate.Qualification_ex3') }}
                            </p> -->
                            <p>
                            {{ $t('jobcreate.Qualification_ex4') }}
                            <br />
                            {{ $t('jobcreate.Qualification_ex5') }}
                            <br />
                            {{ $t('jobcreate.Qualification_ex6') }}
                            </p>
                            <!-- <p>
                            {{ $t('jobcreate.Qualification_ex7') }}
                            <br />
                            {{ $t('jobcreate.Qualification_ex8') }}
                            </p> -->
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea
                            class="form-control"
                            id="qualification"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.qualification"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>応募資格・語学力</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">
                            {{ $t('jobcreate.allowance') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex1') }}
                            </label>
                            <p>
                            {{ $t('jobcreate.allowance_ex2') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex3') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex4') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex5') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex6') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex7') }}
                            <br />
                            </p>
                            <p>
                            {{ $t('jobcreate.allowance_ex8') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex9') }}
                            <br />
                            <!-- {{ $t('jobcreate.allowance_ex10') }}
                            <br /> -->
                            </p>
                            <p>
                            {{ $t('jobcreate.allowance_ex11') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex12') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex13') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex14') }}
                            <br />
                            {{ $t('jobcreate.allowance_ex15') }}
                            </p>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea
                            class="form-control"
                            id="allowance"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.allowance"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>給与・待遇・ビザサポート</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">
                            {{ $t('jobcreate.startdate') }}
                            <br />
                            {{ $t('jobcreate.startdate_ex1') }}
                            </label>
                            <p>
                            {{ $t('jobcreate.startdate_ex2') }}
                            <br />
                            {{ $t('jobcreate.startdate_ex3') }}
                            </p>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <!-- <input type="date" name="" class="form-control" placeholder="生年月日" v-model="formRegister.job_start_date" /> -->
                            <!-- <date-picker :lang="lang" placeholder="年 - 月 - 日" valueType="format" v-model="formRegister.job_start_date" class="form-control"></date-picker> -->
                            <textarea
                            class="form-control"
                            id="job_start_date"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.job_start_date"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>勤務開始日</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">
                            {{ $t('jobcreate.location') }}
                            <br />
                            {{ $t('jobcreate.location_ex1') }}
                            </label>
                            <p>{{ $t('jobcreate.location_ex2') }}</p>
                            <!-- <span class="required">必要</span> -->
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea
                            class="form-control"
                            id="job_location"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.job_location"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>勤務地詳細</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">{{ $t('jobcreate.Application_address') }}</label>
                            <span class="required">必須</span>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <p>{{ $t('jobcreate.Application_address_txt') }}</p>
                            <input
                            type="text"
                            disabled
                            :class="['form-control',$v.formRegister.application_address.$error?'is-invalid':'']"
                            name="メールアドレス"
                            id="email"
                            placeholder="メールアドレス"
                            autocomplete="off"
                            v-model="$v.formRegister.application_address.$model"
                            />
                            <!-- <input type="text" v-model="currentUser.email" :class="['form-control',$v.formRegister.application_address.$error?'is-invalid':'']"> -->

                            <div class="invalid-feedback">
                            <span v-if="!$v.formRegister.application_address.required">メールが必須です</span>
                            <span v-if="!$v.formRegister.application_address.application_address">メールが無効です</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row mb-0 d-flex">
                        <div class="col-md-4 form-left-block">
                            <label for="name">
                            {{ $t('jobcreate.message_jobs') }}
                            <br />
                            {{ $t('jobcreate.message_jobs_ex1') }}
                            </label>
                            <p>
                            {{ $t('jobcreate.message_jobs_ex2') }}
                            <br />
                            {{ $t('jobcreate.message_jobs_ex3') }}
                            <br />
                            {{ $t('jobcreate.message_jobs_ex4') }}
                            </p>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <textarea
                            class="form-control"
                            id="message"
                            rows="3"
                            style="height: 100%;"
                            v-model="formRegister.message"
                            ></textarea>
                            <div class="invalid-feedback">
                            <span>求職者へのメッセージ</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 form-bordered mt-5">
                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">{{ $t('jobcreate.area') }}</label>
                            <span class="required">必須</span>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <div id="disabledMask"></div>
                            <select
                            v-model="$v.formRegister.country_id.$model"
                            :class="['form-control mb-0',$v.formRegister.country_id.$error?'is-invalid':'']"
                            >
                            <option disabled value>{{ $t('jobcreate.area_select') }}</option>
                            <option
                                v-for="countries in countries"
                                :key="countries.id"
                                v-bind:value="countries.id"
                            >{{countries.country_name}}</option>
                            </select>
                            <div class="invalid-feedback">
                            <span
                                v-if="!$v.formRegister.country_id.required"
                            >{{ $t('jobcreate.area_required') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row form-bottom-bordered">
                        <div class="col-md-4 form-left-block">
                            <label for="name">{{ $t('jobcreate.occupation_keyword') }}</label>
                            <span class="required">必須</span>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <select
                            v-model="$v.formRegister.occupation_id.$model"
                            :class="['form-control mb-0',$v.formRegister.occupation_id.$error?'is-invalid':'']"
                            >
                            <option disabled value>{{ $t('jobcreate.occupation_select') }}</option>
                            <option
                                v-for="occupations in occupations"
                                :key="occupations.id"
                                v-bind:value="occupations.id"
                            >{{occupations.occupation_name}}</option>
                            </select>

                            <div class="invalid-feedback">
                            <span
                                v-if="!$v.formRegister.occupation_id.required"
                            >{{ $t('jobcreate.occupation_required') }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row mb-0 d-flex">
                        <div class="col-md-4 form-left-block">
                            <label for="name" style="line-height: 22px;">{{ $t('jobcreate.other_keyword') }}</label>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <div class="row col-12 p-0 m-0">
                            <div class="col-md-3" v-for="(keyword, index) in other_keywords" :key="keyword.id">
                                <input
                                type="checkbox"
                                :value="keyword"
                                :id="keyword"
                                class="custom-control-input custom-checkbox"
                                v-model="formRegister.other_keywords"
                                />
                                <label
                                :for="keyword"
                                class="custom-control-label custom-checkbox-label"
                                >{{ $t('jobcreate.other_keywords['+ index+']') }}</label>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 form-bordered mt-5">
                    <div class="form-group row mb-0 d-flex">
                        <div class="col-md-4 form-left-block">
                            <label for="name">{{ $t('jobcreate.update_date') }}</label>
                        </div>
                        <div class="col-md-8 form-right-block">
                            <!-- <date-picker
                            :lang="lang"
                            placeholder="年 - 月 - 日"
                            valueType="format"
                            v-model="formRegister.job_post_date"
                            :editable="false"
                            type="date"
                            ></date-picker> -->
                            <date-picker :lang="lang" placeholder="年 - 月 - 日" valueType="format" v-model="formRegister.job_post_date[0]" type="date" class="mr-2"></date-picker>
                            <date-picker v-model="formRegister.job_post_date[1]" valueType="format" type="time" placeholder="Select time"></date-picker>

                            <div class="invalid-feedback">
                                <span>更新日</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div class="d-flex  justify-content-end  mt-5">
            <span @click="$router.go(-1)" class="btn btn-back mr-4">一覧へ戻る</span>
            <button
                type="submit"
                id="post"
                value="確認"
                class="btn btn-save"
                @click="changeStatus('post')"
            >保存する</button>
        </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
    data() {
        return {
            errors: {
                permission: "",
            },
            formRegister: {
                title: '',
                employment_types: [],
                application_address: "",
                country_id: "",
                occupation_id: "",
                other_keywords: [],
                job_post_date : '',
            },
            employment_types: [],
            other_keywords: [
                "新卒歓迎",
                "未経験歓迎",
                "シニア歓迎",
                "上場企業",
            ],
            occupations: [],
            countries: [],
            submitted: false,
            error: null,
            showPass: false,
            lang: {
                days: ["日", "月", "火", "水", "木", "金", "土"],
                months: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
                ],
                placeholder: {
                //date: new Date().toISOString().slice(0,10),
                date: "年 - 月 - 日",
                },
            },
        };
    },

    created() {
        //this.formRegister.job_post_date = new Date().toISOString().slice(0, 10);

        if (this.$route.params.id) {
        this.$api.get("/v1/recruiter/jobs/" + `${this.$route.params.id}` + "/edit")
            .then((res) => {
            this.formRegister = res.data.data;
            console.log(res.data.data); 
            this.formRegister.employment_types = this.formRegister.employment_types.split(',').filter(i => i);
            this.formRegister.other_keywords = this.formRegister.other_keywords.split(",");
            this.formRegister.job_post_date = this.formRegister.job_post_date.split(' ');
            });
        }

        // this.formRegister.recruiter_show_name = "正式名称で表示";
        this.formRegister.application_address = this.$store.getters.currentUser.email;

        this.$api.get("/v1/recruiter/getalldata").then((response) => {
        this.occupations = response.data.occupation;
        this.countries = response.data.country;
        this.employment_types = response.data.employment;
        });
    },
    validations: {
        formRegister: {
            title : {required},
            application_address: { required, email },
            occupation_id: { required },
            country_id: { required },
        },
    },

    methods: {
        jobpostcreate() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            if (this.$route.params.id) {
                this.$api.post("/v1/recruiter/jobs/" + `${this.$route.params.id}` + "/update", this.formRegister)
                .then(res => {
                    // if(res.data.data.job === 'new'){
                    //         this.$alertService.showConfirmDialog(null, 'Would you like to create a new job?', this.$t('alertMessage.yes'), this.$t('alertMessage.no')) 
                    //         .then(r => {
                    //             if(r.value){
                    //                 this.$api.post("/v1/recruiter/jobs/add", this.formRegister).then((resp) =>{
                    //                     console.log(resp); 
                    //                     this.$alertService.showSuccessDialog(null,this.$t('jobcreate.saveSuccess'), this.$t('common.close'));
                    //                     this.$router.push({ path: "/job-list" });
                    //                 });
                    //             }
                    //         });
                    // }else{
                    console.log('Update:'+ res.data.data.job);
                    this.$alertService.showSuccessDialog(null, '保存しました。', this.$t('common.close'));
                    this.$router.push({ path: "/job-list" });
                    // }
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        },

        changeStatus($status) {
            this.formRegister.job_post_status = $status;
            this.jobpostcreate();
        },

        callFunction: function () {
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
            var gettime = localISOTime.split(' ');
            this.formRegister.job_post_date = gettime;
        },
    },

    mounted() {
        this.callFunction();
    },

    computed: {
        registeredUser() {
        return this.$store.getters.registeredUser;
        },
        currentUser() {
        return this.$store.getters.currentUser;
        },
    },
};
</script>

<style lang="scss" scoped>
.custom-control-label::before{
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.custom-checkbox-label {
    top: 0;
    padding-left: 30px;
}
.custom-control-input {
    position: absolute;
    left: 0;
    z-index: -1;
    opacity: 0;
}
.custom-checkbox-label::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    border: #b5b5b5 solid 2px;
    border-radius: 0;
}
.custom-control-label::after {
    position: absolute;
    top: .25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
    background: no-repeat 50%/50% 50%;
}
.custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    background-color: transparent;
    content: '\2714';
    color: #2f2d2c;
    font-size: 15px;
    padding-left: 2px;
    border-color: #b5b5b5;
}
// custom radio
.custion-radio {
    &:checked {
        position: absolute;
        left: -9999px;
        + {
            .custom-radio-lable {
                position: relative;
                padding-left: 35px;
                cursor: pointer;
                line-height: 30px;
                display: inline-block;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 22.4px;
                    height: 22.4px;
                    border: 1px solid #ddd;
                    border-radius: 100%;
                    background: #fff;
                }
                &:after {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: #2f2d2c;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    border-radius: 100%;
                    -webkit-transition: all 0.2s ease;
                    transition: all 0.2s ease;
                    opacity: 1;
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }
            }
        }
    }
    &:not(:checked) {
        position: absolute;
        left: -9999px;
        + {
            .custom-radio-lable {
                position: relative;
                padding-left: 35px;
                cursor: pointer;
                line-height: 30px;
                display: inline-block;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 22.4px;
                    height: 22.4px;
                    border: 1px solid #ddd;
                    border-radius: 100%;
                    background: #fff;
                }
                &:after {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: #2f2d2c;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    border-radius: 100%;
                    -webkit-transition: all 0.2s ease;
                    transition: all 0.2s ease;
                    opacity: 0;
                    -webkit-transform: scale(0);
                    transform: scale(0);
                }
            }
        }
    }
}

.content-wrap {
    background: #fff;
    padding: 30px;
    border: 1px solid #dedede;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 5px 5px;
}
.user-head-tit {
    margin: 0;
    padding: 15px 30px;
    font-size: 20px;
    color: #fff;
    border-radius: 5px 5px 0px 0px;
    background-color: #b4c574;
}


.invalid-feedback{
    display: none;
}
.form-control.is-invalid,
.was-validated .form-control:invalid {
    padding-right: calc(1.5em + 0.75rem);
    background-image: none;
    background-repeat: no-repeat;
    background-position: right calc(0.375em + 0.1875rem) center;
    background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.form-bordered {
    padding-bottom: 0;
    border: 1px solid #919191;
}
.form-bottom-bordered {
    display: flex;
    border-bottom: 1px solid #919191;
    margin-bottom: 0px !important;
}
.form-left-block {
    padding: 15px;
    background: #f2f2ff;
    background: #e6ede8;
    border-right: 1px solid #919191;
}
.form-right-block {
    padding: 15px;
}
.form-paragraph {
    margin-bottom: 0px !important;
}
select[disabled] {
    background-color: blue;
}
select:disabled {
    opacity: 0.6;
}
</style>
