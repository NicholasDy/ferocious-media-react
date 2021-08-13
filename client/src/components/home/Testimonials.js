import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from 'swiper';

// Materialize
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Testimonials.css';
import Spinning from '../extras/Spinning';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function AllTestimonials() {
            await axios
                .get(
                    'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/testimonials'
                )
                .then((res) => {
                    setTestimonials(res.data);
                    setLoading(false);
                });
        }

        return AllTestimonials();

        // eslint-disable-next-line
    }, []);

    return (
        <div
            className='home-testimonials-wrapper'
            style={{ backgroundColor: '#f5f5f5' }}
        >
            <section>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={12}>
                        <div className='black-centered-title'>
                            <h4>The best reference is a good word</h4>
                            <h3>Patient Testimonial</h3>
                            <div
                                className='gdlr-core-testimonial-quote gdlr-core-quote-font gdlr-core-skin-icon'
                                style={{
                                    fontSize: 160,
                                    fontFamily: '"Merriweather", serif',
                                    fontWeight: 800,
                                    marginTop: 70,
                                    marginBottom: 20,
                                    color: 'var(--primero)',
                                }}
                            >
                                &#8220;
                            </div>
                        </div>
                    </Grid>
                </Grid>
                {loading ? (
                    <Spinning />
                ) : (
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={1}
                        autoplay={{ delay: 9000 }}
                        loop={true}
                        speed={1000}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {testimonials &&
                            testimonials.length > 0 &&
                            testimonials.map((test) => (
                                <SwiperSlide key={test.id}>
                                    <div className='testimonial-container'>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: test.content.rendered,
                                            }}
                                            style={{ width: '100%' }}
                                        ></div>
                                        <h6>{test.title.rendered}</h6>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                )}
                <Grid container spacing={7}>
                    <Grid item xs={12}>
                        <div className='feature-text testimonials-more'>
                            <Link to='/contact-us'>
                                Contact Us Now{' '}
                                <i className='fal fa-long-arrow-right'></i>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </section>
        </div>
    );
};

export default Testimonials;
