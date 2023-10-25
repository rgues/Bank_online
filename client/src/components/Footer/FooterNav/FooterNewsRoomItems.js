import React from 'react';
import { Link } from 'react-router-dom';

const FooterNewsRoomItems = () => {

    const items = [

        {
            type: 'footerItem',
            icon: '',
            text: 'Press Release',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Gallery',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Publications',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Notices',
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
                NEWSROOM
            </h3>
            {showItems()}
        </div>
    );
};

export default FooterNewsRoomItems;