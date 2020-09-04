import home from '../components/admin/AdminHome';
import RecruiterList from '../components/admin/recruiter/RecruiterList';
import RecruiterEdit from '../components/admin/recruiter/RecruiterEdit';
import JobList from '../components/admin/recruiter/JobList';
import JobEdit from '../components/admin/recruiter/JobEdit';
import JobApplyList from '../components/admin/recruiter/JobApplyList';
import ScoutedList from '../components/admin/recruiter/ScoutedList';
import PaymentManagement from '../components/admin/recruiter/PaymentManagement';
import JobSeekerList from '../components/admin/jobseeker/JobSeekerList';
import Invoice from '../components/admin/recruiter/Invoice';
import AdminPasswordSetting from '../components/auth/AdminPasswordSetting';

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
    }
];

export default route;