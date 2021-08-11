import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

// Parts
import ScrollToTop from './extras/ScrollToTop';
import Spinning from './extras/Spinning';
import AllItem from './blog/AllItem';
import PageHeaders from './layout/PageHeaders';
import './blog/Blog.css';

const BlogPage = () => {
    const [blogstop, setBlogstop] = useState({
        title: '',
        img: '',
    });
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function pageContent() {
            const blogdata = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/pages/22'
            );

            const postlist = await axios.get(
                'https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/posts'
            );

            Promise.all([blogdata, postlist]).then((res) => {
                setBlogstop({
                    title: res[0].data.title.rendered,
                    img: res[0].data.featured_media,
                });
                setPosts(res[1].data);
                setLoading(false);
            });
        }

        return pageContent();

        // eslint-disable-next-line
    }, []);

    return loading ? (
        <Spinning />
    ) : (
        <div className='all-body'>
            <ScrollToTop />
            <PageHeaders header={blogstop} />

            <section>
                <Grid container spacing={4} justify='center'>
                    <Grid item xs={12} sm={12} className='post-column'>
                        {posts.map((post, index) => (
                            <Grid
                                key={index}
                                container
                                spacing={5}
                                className='blog-post-wrapper'
                            >
                                <AllItem post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </section>
        </div>
    );
};

export default BlogPage;
