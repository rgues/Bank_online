import {faHome, faFileText, faSignIn, faArrowRight, faSignOut } from '@fortawesome/free-solid-svg-icons';
import {faUser } from '@fortawesome/free-solid-svg-icons';

export const HeaderLinkItems = [
    {
        type: 'navItem',
        icon: faHome,
        text: 'About Banco',
        link: '/aboutUs',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faHome,
        text: 'Partner with us',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faHome,
        text: 'Investor Relations',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faHome,
        text: 'NewsRom',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faFileText,
        text: 'Careers',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faHome,
        text: 'Assistant',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Find a Branch',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Open an account',
        link: '/user/register',
        position:'menu-2',
        restricted: true,
        showAdmin:true,
        role:'admin'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Pay / Send money',
        link: '/user/wallet/transfer',
        position:'menu-2',
        restricted: true,
        showAdmin:true,
        role:'admin'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Save / Invest',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Borrow',
        link: '/borrow',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Insure',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Give Back',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faUser,
        text: 'Dashboard',
        link: '/user',
        position:'menu-2',
        restricted: true,
        showAdmin:true,
        exclude: true,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faHome,
        text: 'Users',
        link: '/user/list',
        position:'',
        restricted: true,
        showAdmin:true,
        exclude: true,
        role:'admin'
    },

    {
        type: 'navItem',
        icon: faHome,
        text: 'Transfer Code',
        link: '/user/wallet/codes',
        position:'',
        restricted: true,
        showAdmin:true,
        exclude: true,
        role:'admin'
    },
    {
        type: 'navItem',
        icon: faHome,
        text: 'Transactions',
        link: '/user/admin/transactions',
        position:'',
        restricted: true,
        showAdmin:true,
        exclude: true,
        role:'admin'
    },
    {
        type: 'navItem',
        icon: faArrowRight,
        text: 'How can we help you ',
        position:'menu-3',
        link: '/',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faSignIn,
        text: 'SignIn',
        position:'menu-4',
        link: '/login',
        restricted: false,
        exclude: true,
        role:'all'
    },
    {
        type: 'navItem',
        icon: faSignOut,
        text: 'Logout',
        position:'menu-4',
        link: '/user/logout',
        restricted: true,
        showAdmin:true,
        role:'all'
    }
];