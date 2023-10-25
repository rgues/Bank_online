import React from 'react';
import { Link } from 'react-router-dom';

const FooterServicesItems = () => {
    
    const items = [
    
        {
            type: 'footerItem',
            icon: '',
            text: 'Save / Invest',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Borrow',
            link: '/'
        },
        {
            type: 'footerItem',
            icon: '',
            text: 'Insure',
            link: '/'
        }
        ,
        {
            type: 'footerItem',
            icon: '',
            text: 'Give Back',
            link: '/'
        }
  
    ];

    const showItems = () => {
         return   items.map((item,i)=> (
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
                    SERVICES
                </h3>
            {showItems()}
        </div>
    );
};

export default FooterServicesItems;