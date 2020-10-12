<template>
    <div class="sidebar">
        <!--sidebar-->
        <ul class="list-group panel">
            <li>
                <router-link to="/admin" class="list-group-item">
                    <i class="fa fa-tachometer"></i><b>{{$t('menu.management_screen')}}</b>
                </router-link>
            </li>
            <li>
                <a href="#demo1" class="list-group-item" data-toggle="collapse">
                    <span class="glyphicon glyphicon-chevron-down" data-toggle="childcollapse1"></span>{{$t('menu.recruiter_member')}}
                </a>
                <ul class="collapse in" id="demo1">
                    <li>
                        <router-link to="/admin-recruiter-list" class="list-group-item list-group-child-item">
                            <span class="fa fa-file-text-o"></span>{{$t('recruiter_list.recruiter_member_list')}}
                        </router-link>
                    </li>
                    <li>  
                    <router-link to="/job-list" class="list-group-item list-group-child-item">
                        <i class="fa fa-suitcase"></i>{{ $t('common.recruitment') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/jobapply-list" class="list-group-item list-group-child-item">
                            <span class="fa fa-users"></span>{{ $t('jobapply_list.title') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/scouted-list" class="list-group-item list-group-child-item">
                            <span class="fa fa-cog"></span>{{ $t('scouted_list.title') }}
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/payment-management" class="list-group-item list-group-child-item">
                            <span class="fa fa-file"></span>{{ $t('menu.payment_management') }}
                        </router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#demo2" class="list-group-item" data-toggle="collapse2">
                <span class="glyphicon glyphicon-chevron-down" data-toggle="childcollapse2"></span>
                {{$t('menu.jobseeker_member')}}
                </a>
                <ul>
                <li class="collapse in" id="demo2">
                    <router-link to="/admin-jobseeker-list" class="list-group-item list-group-child-item">
                    <i class="glyphicon glyphicon-th-list"></i>{{ $t('jobseeker_list.jobseeker_member_list') }}
                    </router-link>
                </li>
                </ul>
            </li>
            <li>
                <router-link to="/password-setting" class="list-group-item"><i class="glyphicon glyphicon-lock"></i>{{$t('menu.change_password')}}</router-link>
            </li>
            <li>
                <a to="#" class="list-group-item" @click.prevent="logout"><i class="glyphicon glyphicon-log-out"></i> {{$t('menu.logout')}}</a>
            </li>
        </ul>
        <!--end sidebar-->
    </div>
</template>
<script>
export default {
    name: "app-header",
    methods: {
        logout() {
        this.$store.commit("logout");
        this.$router.push("/");
        },
    },
    computed: {
        currentUser() {
        return this.$store.getters.currentUser;
        },
    },
};
</script>