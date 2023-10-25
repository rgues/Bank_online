import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const Partner = () => {
    return (
        <div className='partner-container'>

            <div className='partner-message'>
                <h2>
                    Banco Connect International group foundation partners with others foundations World wide.
                </h2>
            </div>


            <div className='learn-more-btn'>
                <Link to="/">
                    Learn More
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </Link>
            </div>
        </div>
    );
};

export default Partner;