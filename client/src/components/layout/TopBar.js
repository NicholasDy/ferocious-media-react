import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className='secondary-bar'>
            <div>
                <div className='block-left'>
                    <i className='fal fa-sync'></i>
                    <Link to='/covid-19'>
                        Read our updated message regarding the COVID-19
                        coronavirus
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
