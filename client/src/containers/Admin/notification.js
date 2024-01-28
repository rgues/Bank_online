import React, { useEffect } from 'react';
import { faArrowDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { getNotifications, enableNotification, disableNotification } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Notifications = ({ dispatch, showMore,user }) => {

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    const loadmore = () => {
        const nbNotifications = user.notifications.length;
        dispatch(getNotifications(1,nbNotifications,'DESC',user.notifications));
    }

    const updateStatus = ({ id, active }) => {
        if (active === 0) {
            dispatch(enableNotification(id, user.notifications));
        } else {
            dispatch(disableNotification(id, user.notifications));
        }
    };

    const canActivateNotif = (item) => {
        return user.login && item.id !== user.login.id && user.login.role ==='admin';
    }

    const showUsers = (user) => (

        user && user.users && user.users.length ?
            user.users.map((item,i) => (
                item ? <tr key={i}>
                    <td>{item.tittle}</td>
                    <td>{item.type}</td>
                    <td>{item.description}</td>
                    <td>{item.delay}</td>
                    <td>{item.time}</td>
                    <td>{item.active === 1 ? 'active' : 'disable'}
                        {canActivateNotif(item) ? <FontAwesomeIcon onClick={() => updateStatus(item)} icon={faEdit} /> : null}
                    </td>
                    {user.login && user.login.role === 'admin' &&<td>
                        <Link className='btn-edit' to={`/notif/edit/${item.id}`}>Edit</Link>
                    </td>}
                </tr> :
                    null
            ))
            : null
    )

    return (
        <div>

            {
                user && user.notifications && user.notifications.length ?
                    <div className='current_users'>
                        <h2>Notifications List</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>type</th>
                                    <th>Description</th>
                                    <th>time</th>
                                    <th>delay</th>
                                    <th>time</th>
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

            {showMore && user && user.notifications && user.notifications.length && user.notifications.length < user.nbnotifs &&
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

export default connect(mapStateToProps)(Notifications);