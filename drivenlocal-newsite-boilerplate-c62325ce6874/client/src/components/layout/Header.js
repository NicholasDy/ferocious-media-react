import React from 'react';

// Parts
import PrimaryBar from './PrimaryBar';
import TopBar from './TopBar';

const Header = () => {
    return (
        <div className='main-header'>
            <TopBar />
            <PrimaryBar />
        </div>
    );
};

export default Header;
