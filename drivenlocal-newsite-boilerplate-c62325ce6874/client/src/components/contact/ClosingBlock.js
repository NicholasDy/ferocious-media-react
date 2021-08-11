import React from 'react';

const ClosingBlock = ({ closing }) => {
    return (
        <div className='green-bg'>
            <section>
                <div
                    className='over-green'
                    dangerouslySetInnerHTML={{ __html: closing }}
                ></div>
            </section>
        </div>
    );
};

export default ClosingBlock;
