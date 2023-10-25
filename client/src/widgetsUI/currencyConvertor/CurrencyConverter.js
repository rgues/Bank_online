import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import '../wigdet.css';

const currencies = [
    {
        currency:'USD/KES',
        buying:143.8,
        selling:153
    },
    {
        currency:'USD/KES',
        buying:143.8,
        selling:153
    },
    {
        currency:'GBP/KES',
        buying:176.87,
        selling:199.13
    }
    ,
    {
        currency:'EUR/KES',
        buying:152.05,
        selling:173.79
    }
    ,
    {
        currency:'EUR/KES',
        buying:152.05,
        selling:173.79
    }
    ,
    {
        currency:'ZAR/KES',
        buying:6.24,
        selling:9.25
    }
    ,
    {
        currency:'ZAR/KES',
        buying:6.24,
        selling:9.25
    },
    
    {
        currency:'RUP/KES',
        buying:0,
        selling:0
    }
    ,
    {
        currency:'YNG/KES',
        buying:17.14,
        selling:25.17
    }
    ,
    {
        currency:'SSP/KES',
        buying:0.11,
        selling:0.18
    },
    {
        currency:'RWF/KES',
        buying:6.59,
        selling:9.76
    },
    {
        currency:'JPY/KES',
        buying:95.86,
        selling:112.51
    }
];

const showCurrencies = () => (

    currencies.map((item,i) => (
        <li key={i}>
            <span>{item.currency} :</span> Buying : {item.buying} , Selling : {item.selling}  <span>|</span>
        </li>
    ))
)

const CurrencyConverter = () => {
    return (
        <div className='converter-container'>
            <div className="spacing-container"></div>
            <div className='rate-container'>
                <ul>
                    {showCurrencies()}
                </ul>
            </div>
            <div className='converter-button'> 
                <Link to="/">
                    Currency converter 
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </Link>
            </div>
        </div>
    );
};

export default CurrencyConverter;