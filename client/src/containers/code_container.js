import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Codes from './Admin/codes';
import { clearHideHeader, getHideHeader } from '../actions';


const CodeContainer = (props) => {

    useEffect(() => {
        props.dispatch(getHideHeader(true));
         return () => {
            props.dispatch(clearHideHeader());
         }
     }, []);

        return (
            <div className='admin_container'>
              {/* <div> Search</div> */}
               <Codes showMore={true} {...props} />
        
            </div>
        )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(CodeContainer);