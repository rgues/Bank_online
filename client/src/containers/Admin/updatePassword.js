import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getHideHeader, clearHideHeader, clearPassword, updatePassword } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const UpdatePassword = ({ dispatch, user }) => {

    const [new_password, setNewPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const nagivate = useNavigate();

    useEffect(() => {
        if (user && user.update && user.update.success) {
            setTimeout(() => {
                nagivate('/user/logout');
            }, 2000);
        }
    });

    useEffect(() => {
        dispatch(getHideHeader(true));
        return () => {
            dispatch(clearHideHeader());
            dispatch(clearPassword());
        }
    }, []);

    // Sent login data
    const submitForm = (e) => {
        e.preventDefault();

        if (new_password && password) {
            dispatch(updatePassword({ new_password, password }))
        } else {
            setError('Password must have at least 6 digits.')
        }
       
    }


    // update the form value
    const handleInput = (setState) => (event) =>{
        setError('')
        setState(event.target.value);
    }

   

        const  showHidePassord = () =>{
            showPassword ? setShowPassword(false) : setShowPassword(true);
            ;
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
                    <h2>Edit your password</h2>
                    <p>Please enter your current password and  new password. You'll need it later to login.</p>
                    <p>Your password is private don't share it with anyone.</p>

                    <div className='success'>
                        {
                            user.update && user.update.success ?
                                <div>
                                    {user.update.message}
                                </div>
                                : null
                        }
                    </div>

                    <div className='error'>
                        {
                            error ?
                                <div>
                                    {error}
                                </div>
                                : null
                        }
                    </div>
                    
                    <div className='form_element'>
                        <input type={!showPassword ? 'password' : 'text'}
                            placeholder='Current Password'
                            value={password}
                            onChange={handleInput(setPassword)} />
                        <FontAwesomeIcon onClick={showHidePassord}  icon={faEye} style={{
                            color: '#a32a29',
                            fontSize: '1.5rem'
                        }} />
                    </div>

                    <div className='form_element'>
                        <input type={!showPassword ? 'password' : 'text'}
                            placeholder='New Password'
                            value={new_password}
                            onChange={handleInput(setNewPassword)} />
                        <FontAwesomeIcon onClick={showHidePassord}  icon={faEye} style={{
                            color: '#a32a29',
                            fontSize: '1.5rem'
                        }} />
                    </div>

                    <button type="submit">Edit Password</button>

                    <div className='error'>
                        {
                            user.update && !user.update.success ?
                                <div>
                                    {user.update.message}
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

export default connect(mapStateToProps)(UpdatePassword);