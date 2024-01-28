import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { clearHideHeader, getHideHeader } from '../actions';
import Transaction from './Admin/transaction';
import Notification from './Admin/notification';
import { Link } from 'react-router-dom';

const NotificationsContainer = (props) => {

    useEffect(() => {
        props.dispatch(getHideHeader(true));
         return () => {
            props.dispatch(clearHideHeader());
         }
     }, []);

        return (
            <div className='admin_container'>
                {/*<div> Search</div>*/}
                <div className='add-notification'>
                    <Link className='btn-edit' to={`/register/notification`}>register</Link>
                </div>
               <Notification showMore={true} {...props} />
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(NotificationsContainer);