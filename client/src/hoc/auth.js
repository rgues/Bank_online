import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions';
import { useNavigate } from 'react-router-dom';

const Auth = (ComposedClass, reload) => {

    const AuthenticationCheck = (props) => {

        const [loading, setLoading] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            props.dispatch(auth());
          
            if (props.user && (!props.user.login || !props.user.login.isAuth)) {
                if (reload) {
                    navigate('/login');
                }
            } else {
                if (reload === false) {
                    navigate('/user');
                }
            }
            return () => {
                setLoading(false);
            }

        }, []);

        return (
     
            <div>
                {loading && <div className='loader'>Loading...</div>}
                <div>
                    <ComposedClass {...props} user={props.user} />
                </div>
            </div>
        )
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)

}

export default Auth;