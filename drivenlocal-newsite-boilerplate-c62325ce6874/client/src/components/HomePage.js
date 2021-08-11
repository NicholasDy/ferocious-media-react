import React from 'react';

// Parts
import ScrollToTop from './extras/ScrollToTop';
import MainSlider from './home/MainSlider';
import Testimonials from './home/Testimonials';
import RecentPosts from './home/RecentPosts';

const HomePage = () => {
    return (
        <div className='home-body'>
            <ScrollToTop />
            <MainSlider />
            <Testimonials />
            <RecentPosts />
        </div>
    );
};

export default HomePage;
