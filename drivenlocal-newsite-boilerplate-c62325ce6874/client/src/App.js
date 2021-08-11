import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// CSS
import './App.css';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// Components
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import PostPage from './components/PostPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
    const [about, setAbout] = useState('');
    const [blog, setBlog] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        async function pagesLinks() {
            const aboutlink = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/pages/14'
            );

            const bloglink = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/pages/22'
            );

            const contactlink = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/pages/24'
            );

            Promise.all([aboutlink, bloglink, contactlink]).then((res) => {
                setAbout(res[0].data.slug);
                setBlog(res[1].data.slug);
                setContact(res[2].data.slug);
            });
        }

        return pagesLinks();

        // eslint-disable-next-line
    }, []);

    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path={`/${blog}`} component={BlogPage} />
                <Route exact path='/blog/:slug' component={PostPage} />
                {/* <Route exact path={`/${about}`} component={ } />
                <Route exact path={`/${contact}`} component={ } /> */}
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
