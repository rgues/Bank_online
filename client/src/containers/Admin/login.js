import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser, getHideHeader, clearHideHeader } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Login = ({ dispatch, user }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const nagivate = useNavigate();

    useEffect(() => {
        if (user && user.login && user.login.isAuth) {
            nagivate('/user');
        }
    });

    useEffect(() => {

        dispatch(getHideHeader(true));

        return () => {
            dispatch(clearHideHeader());
        }
    }, []);

    // Sent login data
    const submitForm = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
    }

    // update the form value
    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    }

    // update the form value
    const handleInputPassword = (event) => {
        setPassword(event.target.value);
    }

    const  showHidePassord = () =>{
        showPassword ? setShowPassword(false) : setShowPassword(true) ; 
    }

    return (
        <div className='auth-container' style={{
            background: `url(/images/worldwide.jpg)`,
            backgroundRepeat:'no-repeat !important',
            backgroundSize:'cover',
        }}>

            <div className="equity-brand-ads" style={{
                background: `url(/images/banco_brand.png)`
            }}>

            </div>

            <div className='rl_container login'>
                <form onSubmit={submitForm}>
                    <h2>Sign In</h2>
                    <p>Sign in to continue. Remenber your account is yours, do not share it with anyone.
                    </p>
                    <p>If it is your first time here, you can register by contacting your account manager.
                    </p>

                    <div className='form_element'>
                        <input
                            type="email"
                            placeholder='Enter your Email'
                            value={email}
                            onChange={handleInputEmail} />
                    </div>

                    <div className='form_element'>
                        <input type={!showPassword ? 'password' : 'text'}
                            placeholder='Enter your Password'
                            value={password}
                            onChange={handleInputPassword} />
                        <FontAwesomeIcon onClick={showHidePassord}  icon={faEye} style={{
                            color: '#a32a29',
                            fontSize: '1.5rem'
                        }} />
                    </div>

                    <button type="submit">Sign In</button>

                    <div className='error'>
                        {
                            user.login ?
                                <div>
                                    {user.login.message}
                                </div>
                                : null
                        }
                    </div>
                </form>
            </div>

        </div>

    );

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);