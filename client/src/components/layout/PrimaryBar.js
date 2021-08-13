import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinning from '../extras/Spinning';
import MainMenu from './MainMenu';
import TheLogo from '../../images/ferocious-media-small.jpg';


const PrimaryBar = () => {
    const [pages, setPages] = useState();
    const [resources, setResources] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function pagesLinks() {
            const getpages = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/pages'
            );

            const getresoruces = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/resources'
            );

            Promise.all([getpages, getresoruces]).then((res) => {
                setPages(res[0].data);
                setResources(res[1].data);
                setLoading(false);
            });
        }

        return pagesLinks();

        // eslint-disable-next-line
    }, []);

    const menuitems =
        pages &&
        pages.length > 0 &&
        pages.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(1, 8);

    const submenuitems =
        resources &&
        resources.length > 0 &&
        resources.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div id='navbar' className='primary-bar top-bar'>

            <div className='top-wrapper'>
                <img
                    src={TheLogo}
                    alt='The Vascular Experts'
                    className='footer-logo'
                    width="100"
                    height="100"
                />
                {loading ? (
                    <Spinning />
                ) : (
                    <Fragment>
                        <MainMenu
                            menuitems={menuitems}
                            submenuitems={submenuitems}
                        />
                    </Fragment>
                )}


            </div>
        </div>
    );
};

export default PrimaryBar;
