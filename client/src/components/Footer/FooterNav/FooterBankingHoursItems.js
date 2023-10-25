import React from 'react';
import { Link } from 'react-router-dom';

const FooterBankingHoursItems = () => {

    const items = [

        {
            type: 'footerItem',
            icon: '',
            text: 'Mon-Fri 8am to 4.30pm',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Saturday 8am to 12pm',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Closed on Sundays',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Closed on Public holidays',
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
                SERVICES HOURS
            </h3>
            {showItems()}
        </div>
    );
};

export default FooterBankingHoursItems;