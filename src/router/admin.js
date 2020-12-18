import home from '../components/admin/AdminHome';
import RecruiterList from '../components/admin/recruiter/RecruiterList';
import RecruiterEdit from '../components/admin/recruiter/RecruiterEdit';
import JobList from '../components/admin/recruiter/JobList';
import JobEdit from '../components/admin/recruiter/JobEdit';
import JobDetail from '../components/admin/recruiter/JobDetail';
import JobApplyList from '../components/admin/recruiter/JobApplyList';
import ScoutedList from '../components/admin/recruiter/ScoutedList';
import PaymentManagement from '../components/admin/recruiter/PaymentManagement';
import JobSeekerList from '../components/admin/jobseeker/JobSeekerList';
import JobseekerProfileEdit from '../components/admin/jobseeker/JobseekerProfileEdit';
import Invoice from '../components/admin/recruiter/Invoice';
import AdminPasswordSetting from '../components/auth/AdminPasswordSetting';
import AdminRegister from '../components/auth/AdminRegister';
import RecruiterProfileDetail from '../components/admin/recruiter/RecruiterProfileDetail';
import AdminSetting from '../components/admin/setting/AdminSetting';

const route = [{
        path: '/',
		component: home,
        meta: {
            reqiuresAuth: true,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/admin-recruiter-list',
        name: 'recruiter-list',
        component: RecruiterList,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/admin/recruiter-list/:id/edit',
        component: RecruiterEdit,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/job-list',
        name: 'job-list',
        component: JobList,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        name: "edit",
        path: '/job-list/:id',
        component: JobEdit,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/jobapply-list',
        component: JobApplyList,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/scouted-list',
        component: ScoutedList,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/payment-management',
        component: PaymentManagement,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/admin-jobseeker-list',
        name: 'jobseeker-list',
        component: JobSeekerList,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/invoice',
        component: Invoice,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/password-setting',
        component: AdminPasswordSetting,
        meta: {
            reqiuresAuth: true,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/create-admin',
        component: AdminRegister,
        meta: {
            reqiuresAuth: true,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        path: '/admin-jobseeker-list/jobseeker/:id/edit',
        name: 'JobseekerEdit',
        component: JobseekerProfileEdit,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        name: 'jobseeker-detail',
        path: '/admin-jobseeker-list/jobseeker/:id/detail/:paging',
        component: JobseekerProfileEdit,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        name: 'recruiter-detail',
        path: '/admin-recruiter-list/recruiter/:id/detail/:paging',
        component: RecruiterProfileDetail,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        name: 'recruiter-job-detail',
        path: '/job-list/:id/detail/:paging',
        component: JobDetail,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        name: 'scout-job',
        path: '/job-list/scout/:id/detail',
        component: JobDetail,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
    {
        name: 'admin-setting',
        path: '/admin/admin-setting',
        component: AdminSetting,
        meta: {
            reqiuresAuth: false,
            admin: true, // for only admin component
            jobseeker: false
        }
    },
];

export default route;