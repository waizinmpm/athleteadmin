<template>
    <div>
        <!--sidebar-->
        <ul class="list-group panel">
        <li class="list-group-item"><router-link to="/admin">
            <i class="fa fa-tachometer"></i></router-link>
            <b>{{$t('menu.management_screen')}}</b>
        </li>
        <li>
            <a href="#demo1" class="list-group-item" data-toggle="collapse">
            <span class="glyphicon glyphicon-chevron-down" data-toggle="childcollapse1"></span>{{$t('menu.recruiter_member')}}
            </a>
            <ul>
            <li class="collapse in" id="demo1">
                <router-link to="/admin-recruiter-list" class="list-group-item list-group-child-item">
                <span class="fa fa-file-text-o"></span>{{$t('recruiter_list.recruiter_member_list')}}
                </router-link>
                <router-link to="/job-list" class="list-group-item list-group-child-item">
                <i class="fa fa-suitcase"></i>{{ $t('common.recruitment') }}
                </router-link>
                <router-link to="/jobapply-list" class="list-group-item list-group-child-item">
                <span class="fa fa-users"></span>{{ $t('jobapply_list.title') }}
                </router-link>
                <router-link to="/scouted-list" class="list-group-item list-group-child-item">
                <span class="fa fa-cog"></span>{{ $t('scouted_list.title') }}
                </router-link>
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
        <li class="list-group-item">
            <router-link to="/password-setting" class>{{$t('menu.change_password')}}</router-link>
        </li>
        <li class="list-group-item">
            <a to="#" class @click.prevent="logout">{{$t('menu.logout')}}</a>
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