import React from 'react';

// CSS
import './Extras.css';

const Spinning = () => {
    return (
        <div className='spinning'>
            <div className='lds-ripple'>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinning;
