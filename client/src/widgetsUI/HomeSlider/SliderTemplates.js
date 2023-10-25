import React from 'react';
// import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './Slider.css';

const SliderTemplates = (props) => {

    let template = null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.settings
        
    };

    switch (props.type) {

        case ('featured'):
            template = props.data.map((item, i) => {
                return (
                    <div key={i}>
                        <div className='featured_item'>
                            <div className='featured_image' style={{
                                background:`url(/images/slider/${item.image})`
                            }}>
                            </div>
                            {/* <Link to={`/`}>
                               <div className='featured_caption'>
                                    {item.title}
                               </div> 
                            </Link> */}
                        </div>
                    </div>
                );
            });
            break;
        default:
            template = null;

    }

    return (
        <Slider {...settings} >
            {template}
        </Slider>
    );
};

export default SliderTemplates;