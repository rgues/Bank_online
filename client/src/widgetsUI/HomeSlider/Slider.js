import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../config'; 
import SliderTemplates from './SliderTemplates';

class Slider extends Component {

    state = {
        news: [{
            id:1,
            title:'',
            image:'slider-1.png'
        }]
    }

    componentDidMount() {

    }

    render() {
        return (
           <SliderTemplates data = { this.state.news } type = { this.props.type } settings = { this.props.settings }  />
        );
    }
}

export default Slider;