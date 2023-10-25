import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom'

const CardInfo = (props) => {
    let news = props.news;
    return (
        <div className='card-info'>

            <div className='card-image' style={{
                background: `url('/images/news/${news.image}')`
            }}>

            </div>

            <div className='card-body'>

                <div className='card-body-title'>
                    <h3>{news.title}</h3>
                </div>


                <div className='card-body-description'>
                    <p>
                        {news.description}
                    </p>
                </div>

                <div className="card-body-btn">
                    <Link>
                        More Info
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </Link>
                </div>


            </div>

        </div>
    );
};

export default CardInfo;