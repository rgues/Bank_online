import React from 'react';
import { Link } from 'react-router-dom';

const TermesAndConditions = () => {

    const year = (new Date()).getFullYear();

    const items = [
        {
            title:'Privacy Policy',
            url:'/'
        },
        {
            title:'Terms and Conditions',
            url:'/'
        },
        {
            title:'Banco Connect Online',
            url:''
        },
        {
            title:'Sitemap',
            url:'/'
        },
        {
            title:`(c) ${year} All rights reserved `,
            url:'/'
        }
    ];

    const showItems = () => (
        items.map((item,i) =>(
            <div key={i} className="terms">
                <Link to={item.url}>
                    {item.title}
                </Link>
            </div>
        ))
    )

    return (
        <div className='termes-and-conditions'>
            {showItems()}
        </div>
    );
};

export default TermesAndConditions;