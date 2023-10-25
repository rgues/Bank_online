import React from 'react';
import CardInfo from '../../widgetsUI/CardInfo/CardInfo';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const News = () => {

    const newsData = [
        {
            image:'news-1.png',
            title:'Banco Connect successfully excel gaining more customers based on the quality of his service',
            description:'We are always looking forward to giving a handshake to our favorite clients.',
            id:1,
            show:true
        },
        {
            image:'news-2.png',
            title:'Banco Connect always shall be the best over millions worldwide',
            description:'Be the best and a reference in all what it does will surely be his slogan.',
            id:2,
            show:true
        },
        {
            image:'news-3.png',
            title:'Banco Connect  growth with 31%  to record a Pounds 2.54 billion',
            description:'the strong growth speaks to the Group\' embedded social and trust capital.',
            id:3,
            show:true
        }
    ]

    const showItems = () => (
        newsData.map((item,i) => (
            item.show?
            <CardInfo key={i} news={item} />
            :null
    )))


    return (
        <div className='news-container'>
            <div className='news-headline'>
                <h1>Always been updated with our weekly info on Banco Connect</h1>
            </div>

            <div className='news-slider'>
                <div className='left'>
                <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className='right'>
                <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
     
            <div className="news-items">
                {showItems()}
            </div>

        </div>
    );
};

export default News;