import React from 'react';
import { Link } from 'react-router-dom';

const FooterAboutEquityItems = () => {

    const items = [

        {
            type: 'footerItem',
            icon: '',
            text: 'Who are we',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Partner with us',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Investor Relations',
            link: '/'
        },
     
        {
            type: 'footerItem',
            icon: '',
            text: 'Privacy Notice',
            link: '/'
        }
    ];

    const showItems = () => {
        return items.map((item, i) => (
            <div key={i} className={item.type}>
                <Link to={item.link}>
                    {item.text}
                </Link>
            </div>
        ))
    }
    return (
        <div>
            <h3>
                ABOUT BANCO CONNECT
            </h3>
            {showItems()}
        </div>
    );
};
export default FooterAboutEquityItems;