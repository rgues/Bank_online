import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { clearHideHeader, getHideHeader } from '../actions';
import Transaction from './Admin/transaction';

const TransactionsContainer = (props) => {

    useEffect(() => {
        props.dispatch(getHideHeader(true));
         return () => {
            props.dispatch(clearHideHeader());
         }
     }, []);

        return (
            <div className='admin_container'>
                {/*<div> Search</div>*/}
               <Transaction showMore={true} {...props} />
             
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(TransactionsContainer);