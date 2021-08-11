import React, { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import './Home.css';

// Parts
import FeaturedImages from '../extras/FeaturedImages';
import Spinning from '../extras/Spinning';
import { Link } from 'react-router-dom';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);

const MainSlider = () => {
    const [sliders, setSliders] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function allSliders() {
            await axios
                .get(
                    `https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/sliders`
                )
                .then((res) => {
                    setSliders(res.data);
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        }

        allSliders();

        // eslint-disable-next-line
    }, []);

    return loading ? (
        <Spinning />
    ) : (
        <Fragment>
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                autoplay={{ delay: 7000 }}
                loop={true}
                speed={1000}
                navigation
            >
                {sliders
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((slider, index) => (
                        <SwiperSlide key={index}>
                            <div className='caption-container'>
                                <h1
                                    dangerouslySetInnerHTML={{
                                        __html: slider.title.rendered,
                                    }}
                                ></h1>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: slider.content.rendered,
                                    }}
                                ></div>
                                <div className='read-more-blue'>
                                    <Link
                                        to={`/${slider.fm_slider_metabox.link}`}
                                    >
                                        {slider.fm_slider_metabox.linkname}
                                    </Link>
                                    <div className='blue-decorative-line'></div>
                                </div>
                            </div>

                            <FeaturedImages theimg={slider.featured_media} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </Fragment>
    );
};

export default MainSlider;
