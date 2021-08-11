import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className='secondary-bar'>
            <div className='top-wrapper'>
                <div className='block-left'>
                    <i className='fal fa-sync'></i>
                    <Link to='/covid-19'>
                        Read our updated message regarding the COVID-19
                        coronavirus
                    </Link>
                </div>
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
            </div>
        </div>
    );
};

export default TopBar;
