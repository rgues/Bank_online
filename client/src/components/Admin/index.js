import React, { useEffect } from 'react';
import UserWallet from './user_wallet';
import Transaction from '../../containers/Admin/transaction';
import Users from '../../containers/Admin/users';
import { connect } from 'react-redux';
import { clearHideHeader, clearUser, getHideHeader, getUserDetail } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const User = ({ user, dispatch }) => {

    const navigate = useNavigate();


    useEffect(() => {

        if (user && user.login) {
            dispatch(getUserDetail(user.login.id))
        }

        return () => {
            dispatch(clearUser());

        }
    }, [dispatch])


    useEffect(() => {
        if (user.login && user.login.role !== 'client') {
            dispatch(getHideHeader(true));
        }

        return () => {

            if (user.login && user.login.role !== 'client') {
                dispatch(clearHideHeader());
            }
        }
    }, []);


    return (
    
            <div className='admin_container'>
                <div className='user_container'>
                    <div className='nfo'>
                        <div><span>FirstName : </span>{user && user.login ? user.login.firstname : null} </div>
                        <div><span>LastName : </span> {user && user.login ? user.login.lastname : null}</div>
                    </div>
                    <div className='nfo'>
                        <div><span>Account Nb : </span>{user && user.current_user ? `xxxxxxx${user.current_user.accountNumber ? String(user.current_user.accountNumber).substring(7, 11) : ''}` : null}</div>
                        <div><span>Address : </span>{user && user.current_user ? user.current_user.address : null}</div>


                    </div>
                    <div className='nfo'>
                        <div><span>Email : </span>{user && user.login ? user.login.email : null}</div>
                        <div><span>Phone : </span>{user && user.current_user ? user.current_user.phone : null}</div>
                    </div>
                    {user && user.login && user.login.role !== 'client' &&
                        <div className='nfo'>
                            <div><span>Password : </span>xxxxxxx <FontAwesomeIcon onClick={() => navigate('/update/password')} icon={faEdit} /></div>
                        </div>}
                </div>

                <div className='user_list'>
                    {user && user.login && user.login.role !== 'client' ? <Users showMore={false} /> : null}
                </div>

                {user && user.login && user.login.role === 'client' && 
                <div className='user_wallet'>
                     <UserWallet showMore={true} /> 
                </div>
                }
                {user && user.login && user.login.role !== 'client' && <div className='user_transactions'>
                     <Transaction showMore={false} /> 
                </div>}
            </div>
       
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(User);