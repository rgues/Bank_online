import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const StockMarket = () => {
    return (
        <div className='stock-container'>
            <div className='btn-dark'>
                <Link to="/">
                    Stocket Market
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </Link>
            </div>
        </div>
    );
};

export default StockMarket;