import axios from 'axios';
import React, { useEffect } from 'react';
import { URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {

    let timeout = null;
    const navigate = useNavigate();

    const setLogoutTimeout = () =>   timeout = setTimeout(() => { navigate('/') },500);

    useEffect(() => {
        axios.get(`${URL}/api/logout`)
        .then(response => {
            if (response.status === 200) {
                setLogoutTimeout();
            }
        }).catch(err => {
    
        });

        return () => {
            clearTimeout(timeout);
        }
    })

    return (
        <div className="logout_container">
           <h1>
                Sorry to see you go :(
           </h1>
        </div>
    );
};

export default Logout;