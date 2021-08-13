import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Parts
import Spinning from '../extras/Spinning';
import { Fragment } from 'react';

const Footer = () => {
    const [pages, setPages] = useState([]);
    const [resources, setResources] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function pagesLinks() {
            const pagesdata = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/pages'
            );

            const resourcesdata = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/resources'
            );

            Promise.all([pagesdata, resourcesdata]).then((res) => {
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
        pages.sort((a, b) => new Date(a.date) - new Date(b.date));

    const menuitems2 =
        resources &&
        resources.length > 0 &&
        resources.sort((a, b) => new Date(a.date) - new Date(b.date));

    const serClick = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className='footer'>
            <div className="footerdiv">
                <Grid
                    container

                    spacing={10}>
                    {loading ? (
                        <Spinning />
                    ) : (
                        <Fragment>
                            <Grid item xs={12} sm={6} md={3}>
                                <h5>Navigation</h5>
                                <ul className='footer-navigation'>
                                    <li>
                                        <Link to='/'>
                                            <i className='fal fa-long-arrow-right'></i>{' '}
                                            Home
                                        </Link>
                                    </li>
                                    {menuitems &&
                                        menuitems.slice(1, 8).map((uno) => (
                                            <li key={uno.id}>
                                                <Link
                                                    to={`/${uno.slug}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `<i class="fal fa-long-arrow-right"></i> ${uno.title.rendered}`,
                                                    }}
                                                ></Link>
                                            </li>
                                        ))}
                                </ul>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <h5>Patient Resources</h5>
                                <ul className='footer-navigation'>
                                    {menuitems2 &&
                                        menuitems2.slice(0, 9).map((dos) => (
                                            <li key={dos.id}>
                                                <Link
                                                    onClick={serClick}
                                                    to={`/patient-resources/${dos.slug}`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `<i class="fal fa-long-arrow-right"></i> ${dos.title.rendered}`,
                                                    }}
                                                ></Link>
                                            </li>
                                        ))}
                                </ul>
                            </Grid>
                        </Fragment>
                    )}
                    <Grid item xs={12} sm={6} md={3}>
                        <h5>Hospital Hours</h5>
                        <div
                            className='gdlr-core-opening-hour-widget'
                            style={{ color: '#17449e' }}
                        >
                            <div className='gdlr-core-opening-hour-widget-list line'>
                                <span className='gdlr-core-head'>
                                    <i className='fal fa-clock'></i> Mon - Fri
                                </span>
                                <span className='gdlr-core-tail'> 8:00am - 5:00pm</span>
                            </div>
                            <div className='gdlr-core-opening-hour-widget-list line'>
                                <span className='gdlr-core-head'>
                                    <i className='fal fa-times-circle'></i> Sat
                                    - Sun
                                </span>
                                <span className='gdlr-core-tail'> Closed</span>
                            </div>
                            <div className='last-footer-widget'>
                                <br />
                                <div
                                    className='phone-bottom'
                                    style={{ color: '#17449e' }}
                                >
                                    <i
                                        className='fal fa-phone-alt'
                                        style={{
                                            fontSize: 19,
                                            color: '#17449E',
                                            marginRight: 10,
                                        }}
                                    ></i>
                                    <a href='tel:8458228100'>(845) 822-8100</a>
                                </div>{' '}
                                <div className='button'>
                                    <Link
                                        className='footer-button'
                                        to='/our-locations'
                                    >
                                        <span className='gdlr-core-content'>
                                            Locations
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                    </Grid>
                </Grid>
            </div>
            <div className='bottom-bar'>
                <section>
                    <div className='bottom-extras'>
                        <div className='block-right'>
                            <div className='social-icons'>
                                <a
                                    href='https://www.facebook.com/TheVascularExperts/'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <i className='fab fa-facebook-f'></i>
                                </a>
                            </div>
                            <div className='social-icons'>
                                <a
                                    href='https://www.linkedin.com/company/the-vascular-experts'
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <i className='fab fa-linkedin-in'></i>
                                </a>
                            </div>
                        </div>
                        <p>
                            Frey Agriculture Products © 2021 | Design and Dev by{' '}
                            <a
                                href='https://ferociousmedia.com'
                                target='_blank'
                                rel='noreferrer'
                            >
                                Ferocious Media
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Footer;
