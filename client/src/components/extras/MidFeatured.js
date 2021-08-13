import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import placeHolder from '../../images/placeholder.jpg';

const MidFeatured = ({ theimg }) => {
    const [img, setImg] = useState({
        alt_text: '',
        url: `${placeHolder}`,
    });

    useEffect(() => {
        async function featImg() {
            if (theimg !== 0) {
                await axios
                    .get(
                        `https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/media/${theimg}`
                    )
                    .then((res) => {
                        setImg({
                            alt_text: res.data.alt_text,
                            url: res.data.media_details.sizes.full.source_url,
                        });
                    })
                    .catch((err) => console.log(err));
            }
        }

        featImg();
    }, [theimg]);

    return theimg === 0 ? (
        <Fragment>
            <img src={placeHolder} alt='Place holder' />
        </Fragment>
    ) : (
        <Fragment>
            <img src={img.url} alt={img.alt_text} />
        </Fragment>
    );
};

export default MidFeatured;
