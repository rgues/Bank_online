import React from 'react';
import HeaderNavItems from './HeaderNavItems';
import { connect } from 'react-redux';
import HeaderNavItemsAdmin from './HeaderNavItemsAdmin';

const HeaderNav = (props) => {
    return (
        <div>
          {!props.user ||!props.user.hideHedear  ? <HeaderNavItems {...props} /> : null } 
          {props.user&&props.user.hideHedear  ? <HeaderNavItemsAdmin {...props} /> : null } 
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HeaderNav);