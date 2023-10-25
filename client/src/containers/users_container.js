import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Users from './Admin/users';
import { clearHideHeader, getHideHeader } from '../actions';


const UsersContainer = (props) => {

    useEffect(() => {
        props.dispatch(getHideHeader(true));
         return () => {
            props.dispatch(clearHideHeader());
         }
     }, []);

        return (
            <div className='admin_container'>
              {/* <div> Search</div> */}
               <Users showMore={true} {...props} />
        
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UsersContainer);