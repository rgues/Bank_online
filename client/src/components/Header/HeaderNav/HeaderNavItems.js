import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { HeaderLinkItems } from './HeaderNavLink';
import { faUser } from '@fortawesome/free-solid-svg-icons';


const HeaderNavItems = ({ user}) => {

    const items = HeaderLinkItems;

    const navigate = useNavigate();

    const element1 = (item, key) => (
        <Link key={key} to={item.link} >
            {item.text}
        </Link>
    )

    const element2 = (item, key) => (
        <Link key={key} to={item.link} >
            {item.text}
            <FontAwesomeIcon icon={item.icon} name={item.text} style={{
                color: '#8d2424',
                paddingLeft: '10px',
                fontSize: '15px',
                cursor: 'pointer'
            }} />

        </Link>
    )

    const showItems = (user, position) => (

        user.login ? items.filter((item) => item.position === position).map((item, i) => {

            if (user.login.isAuth) {
                return !item.exclude && (user.login.role !== 'client' || item.role ==='all' ) ? 
                (item.position === 'menu-1' || item.position === 'menu-2' || item.position === 'menu-4') 
                ? element1(item, i) : element2(item, i) : null;
            } else {
                return !item.restricted ? (item.position === 'menu-1' || item.position === 'menu-2' || item.position === 'menu-4') 
                ? element1(item, i) : element2(item, i) : null;
            }
        })
            : null

    )


    return (
        <div className='header-menu'>

            <div  onClick={() => navigate('/')}  className='logo' style={{
                background:`url(/images/banco-logo.png)`
            }}>
            
            </div>
        
            <div className='header-menu-items'>

                <div className='menu-1'>
                    {showItems(user, 'menu-1')}

                    { user.login&& user.login.isAuth &&
                    <Link to={'/user'}>
                        <FontAwesomeIcon icon={faUser} style={{
                            color: '#8d2424',
                            paddingLeft: '10px',
                            fontSize: '20px',
                            cursor: 'pointer'
                     }} />
                    </Link>
                    }
                </div>

                <div className='menu-2'>

                    {showItems(user, 'menu-2')}

                    <div className={!user ||!user.hideHedear ? 'menu-button-help-1': 'menu-button-help-0'}>
                        {showItems(user, 'menu-3')}
                    </div>

                    <div className={!user ||!user.hideHedear ? 'menu-button-login-2': 'menu-button-login-1'}>
                        {showItems(user, 'menu-4')}
                    </div>

                </div>

            </div>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HeaderNavItems);