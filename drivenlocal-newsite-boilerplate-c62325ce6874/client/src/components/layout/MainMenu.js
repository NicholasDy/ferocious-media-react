import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Slant as Hamburger } from 'hamburger-react';

// Materialize
import { IconButton } from '@material-ui/core';
import './MainMenuStyle.css';

const MainMenu = ({ menuitems, submenuitems }) => {
    const [isOpen, setOpen] = useState(false);

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = () => {
        const opeMenu = document.getElementById(
            'primary-search-account-menu-mobile'
        );
        if (opeMenu.classList.contains('opened-menu')) {
            opeMenu.classList.remove('opened-menu');
        } else {
            opeMenu.classList.add('opened-menu');
        }
    };

    const wrapperRef = useRef(null);
    const subwrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                const opeMenu = document.getElementById(
                    'primary-search-account-menu-mobile'
                );

                opeMenu.classList.remove('opened-menu');
                setOpen(false);

                var hamb = document.getElementsByClassName('hamburger-react');
                var hambdiv = document.querySelectorAll('.hamburger-react div');
                for (var i = 0; i < hamb.length; i++) {
                    hamb[i].style.transform = 'none';
                }
                for (var x = 0; x < hambdiv.length; x++) {
                    hambdiv[x].style.transform = 'none';
                }
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    useEffect(() => {
        const handleClickOutsideSub = (event) => {
            if (
                subwrapperRef.current &&
                !subwrapperRef.current.contains(event.target)
            ) {
                const opeSubMenuUno = document.getElementById('sub-menu-uno');
                const opeSubMenuTres = document.getElementById(
                    'mobile-sub-menu-uno'
                );

                opeSubMenuUno.classList.remove('abierto-submenu');
                opeSubMenuTres.classList.remove('abierto-submenu');
            }
        };

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutsideSub);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutsideSub);
        };
    });

    const closeMenu = () => {
        const closeMenu = document.getElementById(
            'primary-search-account-menu-mobile'
        );
        closeMenu.classList.remove('opened-menu');
        setOpen(false);
    };

    const subUno = (e) => {
        e.preventDefault();

        const sub1 = document.getElementById('sub-menu-uno');

        if (sub1.classList.contains('abierto-submenu')) {
            sub1.classList.remove('abierto-submenu');
        } else {
            sub1.classList.add('abierto-submenu');
        }
    };

    const outHover = () => {
        const sub1 = document.getElementById('sub-menu-uno');

        if (sub1.classList.contains('abierto-submenu')) {
            sub1.classList.remove('abierto-submenu');
        }
    };

    const hoverMenuU = () => {
        const sub1 = document.getElementById('sub-menu-uno');

        sub1.classList.add('abierto-submenu');
    };

    const mobsubMenu = (e) => {
        e.preventDefault();
        const openOne = document.getElementById('mobile-sub-menu-uno');

        if (openOne.classList.contains('abierto-submenu')) {
            openOne.classList.remove('abierto-submenu');
        } else {
            openOne.classList.add('abierto-submenu');
        }
    };

    const NeedHov = (mitem) => {
        if (mitem.title.rendered === 'Patient Resources') {
            return hoverMenuU;
        } else {
            return outHover;
        }
    };

    const NeedClk = (mitem) => {
        if (mitem.title.rendered === 'Patient Resources') {
            return subUno;
        } else {
            return null;
        }
    };

    const NeedClkMob = (mitem) => {
        if (mitem.title.rendered === 'Patient Resources') {
            return mobsubMenu;
        } else {
            return closeMenu;
        }
    };

    return (
        <div className='menu-container'>
            <div className='section-desktop'>
                <ul>
                    <li>
                        <NavLink
                            exact
                            className='top-menu'
                            to='/'
                            activeClassName='top-active'
                        >
                            Home
                        </NavLink>
                    </li>
                    {menuitems.map(
                        (mitem) =>
                            mitem.title.rendered !== 'Contact Us' && (
                                <li
                                    key={mitem.id}
                                    className={
                                        mitem.title.rendered ===
                                        'Patient Resources'
                                            ? 'has-submenu'
                                            : ''
                                    }
                                >
                                    <NavLink
                                        exact
                                        onMouseOver={NeedHov(mitem)}
                                        onClick={NeedClk(mitem)}
                                        className='top-menu'
                                        to={
                                            mitem.slug === 'patient-resources'
                                                ? `#!`
                                                : `/${mitem.slug}`
                                        }
                                        activeClassName={
                                            mitem.slug === 'patient-resources'
                                                ? ''
                                                : 'top-active'
                                        }
                                    >
                                        {mitem.title.rendered}
                                    </NavLink>
                                </li>
                            )
                    )}
                    <div id='sub-menu-uno' className='submenu-pop-up'>
                        <ul>
                            {submenuitems &&
                                submenuitems.map((sub) => (
                                    <li key={sub.id}>
                                        <Link
                                            to={`/patient-resources/${sub.slug}`}
                                            onClick={closeMenu}
                                        >
                                            {sub.title.rendered}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </ul>
            </div>
            <div ref={wrapperRef} className='mobile-menu-wrap class-mobile'>
                <div
                    id='primary-search-account-menu-mobile'
                    className='menu-pop-up'
                    ref={subwrapperRef}
                >
                    <ul ref={subwrapperRef}>
                        <li>
                            <Link to='/' onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        {menuitems.map(
                            (mitem, index) =>
                                mitem.title.rendered !== 'Contact Us' && (
                                    <li
                                        key={index}
                                        ref={subwrapperRef}
                                        className={
                                            mitem.title.rendered ===
                                            'Patient Resources'
                                                ? 'top-menu has-submenu'
                                                : 'top-menu'
                                        }
                                    >
                                        <Link
                                            onClick={NeedClkMob(mitem)}
                                            className={
                                                mitem.title.rendered ===
                                                'Patient Resources'
                                                    ? 'mobile-submenu'
                                                    : ''
                                            }
                                            ref={subwrapperRef}
                                            to={
                                                mitem.title.rendered ===
                                                'Personal Injury'
                                                    ? '/#!'
                                                    : `/${mitem.slug}`
                                            }
                                        >
                                            {mitem.title.rendered}
                                        </Link>

                                        {mitem.title.rendered ===
                                            'Patient Resources' && (
                                            <div
                                                id='mobile-sub-menu-uno'
                                                className='submenu-pop-up'
                                            >
                                                <ul>
                                                    {submenuitems.map(
                                                        (submob) => (
                                                            <li key={submob.id}>
                                                                <Link
                                                                    to={`/patient-resources/${submob.slug}`}
                                                                    onClick={
                                                                        closeMenu
                                                                    }
                                                                >
                                                                    {
                                                                        submob
                                                                            .title
                                                                            .rendered
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                )
                        )}
                    </ul>
                </div>

                <IconButton
                    aria-label='show more'
                    aria-controls={mobileMenuId}
                    aria-haspopup='true'
                    color='inherit'
                    className='mobile-menu'
                >
                    <Hamburger
                        label='NAVIGATION'
                        toggled={isOpen}
                        toggle={setOpen}
                        onToggle={(toggled) => {
                            if (toggled) {
                                renderMobileMenu();
                            } else {
                                closeMenu();
                            }
                        }}
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default MainMenu;
