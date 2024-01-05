import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {

    const items = [
        {
            title: 'Partner with us',
            url: '/',
            icon: faArrowAltCircleRight
        },
        {
            title: 'Investor Relations',
            url: '/',
            icon: faArrowAltCircleRight
        },
        {
            title: 'Newsroom',
            url: '/',
            icon: faArrowAltCircleRight
        },
        {
            title: 'Careers',
            url: '/',
            icon: faArrowAltCircleRight
        },
        {
            title: 'About Banco Connect',
            url: '/aboutUs',
            icon: faArrowAltCircleRight
        }
    ];

    const showLinks = () => (
        items.map((item, i) => (

                <Link className='btn-link' key={i}>
                    {item.title}
                    <FontAwesomeIcon icon={item.icon} />
                </Link>
        ))
    )

    return (
        <div className='about-us-container'>

            <div className='about-us-picture' style={{
                background: `url(/images/about-us.png)`
            }}>

            </div>


            <div className='about-us-links'>
                {showLinks()}
            </div>

        </div>
    );
};

export default AboutUs;
