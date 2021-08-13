import React, { useState, useEffect } from 'react';
import axios from 'axios';

import placeHolder from '../../images/placeholder.jpg';

const PageHeaders = ({ header }) => {
    const [bgImage, setBgimage] = useState('');

    useEffect(() => {
        async function featImg() {
            await axios
                .get(
                    `https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/media/${header.img}`
                )
                .then((res) => {
                    setBgimage(res.data.media_details.sizes.full.source_url);
                })
                .catch((err) => console.log(err));
        }

        return featImg();
    }, [header.img]);

    return (
        <div
            className='top-internal-pages'
            style={{
                backgroundImage: `url(${bgImage ? bgImage : placeHolder})`,
            }}
        >
            <section>
                <h1 dangerouslySetInnerHTML={{ __html: header.title }}></h1>
                <div
                    dangerouslySetInnerHTML={{ __html: header.intro }}
                    className='pages-intro'
                ></div>
            </section>
            <div className='blue-overlay'></div>
        </div>
    );
};

export default PageHeaders;
