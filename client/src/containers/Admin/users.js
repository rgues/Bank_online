import React, { useEffect } from 'react';
import { faArrowDown, faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { getUsers, enableStatus, disableStatus, archiveUser } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Users = ({ dispatch, showMore,user }) => {

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const loadmore = () => {
        const nbTransaction = user.users.length;
        dispatch(getUsers(1,nbTransaction,'DESC',user.users));
    }

    const  canArchiveUser = ({id}) => {
        dispatch(archiveUser(id, user.users));
    }

    const updateStatus = ({ id, active }) => {
        if (active === 0) {
            dispatch(enableStatus(id, user.users));
        } else {
            dispatch(disableStatus(id, user.users));
        }
    };

    const canActivateUser = (item) => {
        return user.login && item.id !== user.login.id && 
        ((item.active === 0 && item.role !== user.login.role && user.login.role ==='manager') 
        || user.login.role ==='admin');
    }

    const showUsers = (user) => (

        user && user.users && user.users.length ?
            user.users.map((item,i) => (
                item ? <tr key={i}>
                    <td>{item.accountNumber}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.canTransfer ? 'yes' : 'no'}</td>
                    <td>{item.role !== 'client' ? item.role : 'customer'  }</td>
                    <td>{item.active === 1 ? 'active' : 'pending'}
                        {canActivateUser(item) ? <FontAwesomeIcon onClick={() => updateStatus(item)} icon={faEdit} /> : null}
                    </td>
                    {user.login && user.login.role === 'admin' &&<td>
                        <Link className='btn-edit' to={`/user/edit/${item.id}`}>Edit</Link>
                        {user.login.id !==item.id && <button  onClick={() => canArchiveUser(item)}> 
                            <FontAwesomeIcon   icon={faRemove} style={{
                                'color':'#fff'
                            }} />
                        </button>}
                       
                    </td>}
                </tr> :
                    null
            ))
            : null
    )

    return (
        <div>

            {
                user && user.users && user.users.length ?
                    <div className='current_users'>
                        <h2>Users List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Account Nb</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Transfer</th>
                                    <th>role</th>
                                    <th>Status</th>
                                    {user.login && user.login.role === 'admin' &&<th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {showUsers(user)}
                            </tbody>
                        </table>
                    </div> : null
            }

            {showMore && user && user.users && user.users.length && user.users.length < user.nbusers &&
                        <div className='loadmore' onClick={loadmore}>
                        <FontAwesomeIcon icon={faArrowDown}  style={{
                            color:'#fff',
                            fontSize:'20px'
                        }}/>
                    </div>
            }

        </div>


    );
};

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Users);