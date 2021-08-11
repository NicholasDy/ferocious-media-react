import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinning from '../extras/Spinning';
import MainMenu from './MainMenu';

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
                <div className='featured-button'>
                    {pages &&
                        pages.length > 0 &&
                        pages.map(
                            (it) =>
                                it.title.rendered.startsWith('Contact') && (
                                    <Link key={it.id} to={`/${it.slug}`}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: it.title.rendered,
                                            }}
                                        ></span>
                                    </Link>
                                )
                        )}
                </div>
            </div>
        </div>
    );
};

export default PrimaryBar;
