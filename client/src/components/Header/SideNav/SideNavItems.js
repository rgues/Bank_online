import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { NavLinkItems } from './SideNavLink';

const SideNavItems = ({ user }) => {

    const items = NavLinkItems;

    const element = (item, key) => (
        <div key={key} className={item.type}>
            <Link to={item.link} >
                {item.icon ?<FontAwesomeIcon icon={item.icon} name={item.text} /> : null }
                {item.text}
            </Link>
        </div>
    )

    const showItems = (user) => (

        user.login ? items.map((item, i) => {

            if (user.login.isAuth) {
                return !item.exclude && (item.position === 'menu-1' || item.position === 'menu-2') 
                && (user.login.role === 'admin' || user.login.role === 'manager' || item.role === 'all' ) ? element(item, i) : null;
            } else {
                return !item.restricted && (item.position=== 'menu-1' || item.position=== 'menu-2')  
                ? element(item, i) : null;
            }
        })
            : null
    )

    return (
        <div>
            {showItems(user)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SideNavItems);