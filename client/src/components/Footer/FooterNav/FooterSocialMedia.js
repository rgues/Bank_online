import {faInstagram, faTwitterSquare, faFacebook, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const FooterSocialMedia = () => {
    
    const items = [

        {
            type: 'footerSocialMedia',
            icon: faFacebook,
            text: 'Facebook',
            link: '/'
        },
        {
            type: 'footerSocialMedia',
            icon: faTwitterSquare,
            text: 'Tweeter',
            link: '/'
        },
        {
            type: 'footerSocialMedia',
            icon: faLinkedin,
            text: 'LinkedIn',
            link: '/'
        },
        {
            type: 'footerSocialMedia',
            icon: faInstagram,
            text: 'Instagram',
            link: '/'
        }
    ];

    const showItems = () => {
           return items.map((item,i)=> (
                <div key={i} className={item.type}>
                        <Link to={item.link}>
                        <FontAwesomeIcon icon={item.icon} name={item.text} style={{
                            color: '#fff',
                            marginLeft:'10px'
                }} />
                        </Link>
                </div>
            ))
    }
    return (
        <div>
            {showItems()}
            <div className="contact">
                <h2>Contact us : </h2>
                <p>info@onlinebancoconnect.com</p>
                <p>support@onlinebancoconnect.com</p>
            </div>
        </div>
    );
};

export default FooterSocialMedia;