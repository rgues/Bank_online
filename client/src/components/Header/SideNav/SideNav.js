import React from 'react';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './SideNavItems';
import { useNavigate } from 'react-router-dom';

const Nav = (props) => {

    const navigate = useNavigate();
    return (
        <SideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle= {{
                background:'#fefefe',
                maxWidth:'220px'
            }}
        >
           <div  onClick={() => navigate('/')}  className='logo-menu' ></div>
            <SideNavItems />
        </SideNav>
    );
};

export default Nav;