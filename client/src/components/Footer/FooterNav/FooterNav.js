import React from 'react';
import FooterServicesItems from './FooterServicesItems';
import FooterNewsRoomItems from './FooterNewsRoomItems';
import FooterAboutEquityItems from './FooterAboutEquityItems';
import FooterBankingHoursItems from './FooterBankingHoursItems';
import FooterSocialMedia from './FooterSocialMedia';

const FooterNav = () => {
    return (

        <footer>
          

            <div className='footer-col'>
                <FooterServicesItems />
            </div>

            <div className='footer-col'>
                <FooterNewsRoomItems />
            </div>

            <div className='footer-col'>
                <FooterAboutEquityItems />
            </div>

            <div className='footer-col'>
                <FooterBankingHoursItems />
            </div>

            <div className='footer-col'>
                <FooterSocialMedia />

            </div>
        </footer>

    );
};

export default FooterNav;