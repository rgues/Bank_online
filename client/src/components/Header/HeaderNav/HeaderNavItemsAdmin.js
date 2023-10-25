

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { HeaderLinkItems } from './HeaderNavLink';

const HeaderNavItemsAdmin = ({ user}) => {

    const items = HeaderLinkItems;

    const navigate = useNavigate();

    const element1 = (item, key) => (
        <Link key={key} to={item.link} >
            {item.text}
        </Link>
    )

    const showItems = (user) => (

        user.login ? items.map((item, i) => (
            user.login.isAuth ?
                 item.showAdmin && (user.login.role !== 'client'  || item.role==='all') ? 
                 element1(item, i) : null
            :null
            )
        ) 
        : null
    )

    return (
        <div className='header-menu'>
            <div  onClick={() => navigate('/')}  className='logo' style={{
                background:`url(/images/banco-logo.png)`
            }}>
            </div>
        
            <div className='header-menu-items'>
                <div className='menu-2'>
                    {showItems(user)}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HeaderNavItemsAdmin);