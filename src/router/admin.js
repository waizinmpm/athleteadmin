import home from '../components/admin/AdminHome';
import RecuriterList from '../components/admin/recuriter/RecuriterList';
import JobList from '../components/admin/recuriter/JobList';
import JobApplyList from '../components/admin/recuriter/JobApplyList';
import ScoutedList from '../components/admin/recuriter/ScoutedList';
import PaymentManagement from '../components/admin/recuriter/PaymentManagement';
import JobSeekerList from '../components/admin/jobseeker/JobSeekerList';
import Invoice from '../components/admin/recuriter/Invoice';

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
        path: '/recuriter-list',
        component: RecuriterList,
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
        path: '/job-seeker-list',
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
    // {
    //     path: '/password-setting',
    //     component: PasswordSetting,
    //     meta: {
    //         reqiuresAuth: false,
    //         admin: true, // for only admin component
    //         jobseeker: false
    //     }
    // }
];

export default route;