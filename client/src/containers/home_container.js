import React, { Component } from 'react';
import { connect } from 'react-redux'
import Slider from '../widgetsUI/HomeSlider/Slider';
import CurrencyConverter from '../widgetsUI/currencyConvertor/CurrencyConverter';
import Partner from '../widgetsUI/Partner/Partner';
import News from '../components/News';
import AboutUs from '../widgetsUI/AboutUs/AboutUs';
import StockMarket from '../widgetsUI/StockMarket/StockMarket';
import Search from '../widgetsUI/Search/Search';


class HomeContainer extends Component {

    render() {

        return (
            <div>
                <Slider
                    type="featured"
                    start={0}
                    amount={5}
                    settings={{
                        dots: false
                    }}
                />
                <CurrencyConverter />
                <Partner/>
                <News />
                <AboutUs/>
                <StockMarket />
                <Search/>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HomeContainer);