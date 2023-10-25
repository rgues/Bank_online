import React, { useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Nav from './SideNav/SideNav';
import HeaderNav from './HeaderNav/HeaderNav';
import HeaderContact from './HeaderContact/HeaderContact';

const Header = (props) => {


    const [showNav, setShowNav] = useState(false);
    const scrollPosition = useRef();
    scrollPosition.current = 0;

    useLayoutEffect(() => {
        window.addEventListener('scroll', () => {
            scrollPosition.current = window.scrollY || 0;
            const element = window.document.querySelector('#scroll');
            if (scrollPosition.current > 0) {
                    element.classList.add('fix_layout');
            } else {
                element.classList.remove('fix_layout');
            }

        });
    })

    const onHideNav = () => {
        setShowNav(false);
    }

    return (

        <div id="scroll">

            <HeaderContact />
            <header  >

                <div className='open_nav'>
                    <FontAwesomeIcon icon={faBars} name='bars' onClick={() => setShowNav(true)}
                        style={{
                            color: '#ffffff',
                            padding: '10px',
                            cursor: 'pointer'
                        }} />
                </div>

                <Nav showNav={showNav}
                    onHideNav={() => onHideNav()}
                />

                <Link className='title' to="/"  >Banco Connect</Link>

                <HeaderNav {...props} />

            </header>

        </div>
    );
}

export default Header;