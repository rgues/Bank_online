import { faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {faInstagram, faTwitterSquare, faFacebook, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderContact = () => {

    const items = [
        {
            type: 'navItem',
            icon: faArrowDown,
            text: '',
            link: '/',
        },
        {
            type: 'navItem',
            icon: faFacebook,
            text: '',
            link: '/',
        },
        {
            type: 'navItem',
            icon: faTwitterSquare,
            text: '',
            link: '/',
        },
        {
            type: 'navItem',
            icon: faLinkedin,
            text: '',
            link: '/',
        },
        {
            type: 'navItem',
            icon: faInstagram,
            text: '',
            link: '/',
        }

    ]

    const showItems = () => (
        items.map((item, i) => (

            <Link key={i} to={item.link} >
                {item.text}
                <FontAwesomeIcon icon={item.icon} name={item.text} style={{
                    color: '#8d2424',
                    marginLeft:'10px'
                }} />
            </Link>

        ))
    )


    return (
        <div className='header-contact'>

    <div className='header-space'>
    </div>

            <div className='social-media'>
                    {showItems()}
            </div>

            <div className="phone-call">
                    {/*<h5>Hotline <span>000 000 000 000</span></h5>*/}
            </div>
                    
        </div>
    );
};

export default HeaderContact;