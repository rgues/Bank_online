
export const NavLinkItems = [

    {
        type: 'navItem',
        icon: '',
        text: 'Dasboard',
        link: '/user',
        position:'menu-2',
        restricted: true,
        role:'all'
    },
  
    {
        type: 'navItem',
        icon: '',
        text: 'login',
        link: '/login',
        position:'menu-2',
        restricted: false,
        exclude: true,
        role:'all'
    },


    {
        type: 'navItem',
        icon: '',
        text: 'Log out',
        link: '/user/logout',
        position:'menu-2',
        restricted: true,
        role:'all'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Open an account',
        link: '/user/register',
        position:'menu-2',
        restricted: true,
        role:'admin'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Pay / Send money',
        link: '/user/wallet/transfer',
        position:'menu-2',
        restricted: true,
        role:'admin'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Save / Invest',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Borrow',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Insure',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Give Back',
        link: '/',
        position:'menu-2',
        restricted: false,
        role:'all'
    },

    {
        type: 'navItem',
        icon: '',
        text: 'Partner with us',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: '',
        text: 'Investor Relations',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    },
    {
        type: 'navItem',
        icon: '',
        text: 'NewsRom',
        link: '/',
        position:'menu-1',
        restricted: false,
        role:'all'
    }
];