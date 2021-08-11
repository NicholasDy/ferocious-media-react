import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

import { Grid } from '@material-ui/core';

// Parts
import Spinning from '../extras/Spinning';
import AllItem from '../blog/AllItem';

const RecentPosts = () => {
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetPosts() {
            await axios
                .get(
                    `https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/posts`
                )
                .then((res) => {
                    setPosts(res.data);
                    setLoading(false);
                });
        }

        return GetPosts();

        // eslint-disable-next-line
    }, []);

    return (
        <div className='recent-posts'>
            <section>
                <div className='rp-titles'>
                    <div className='sub-titles'>
                        <h3>Recent Posts</h3>
                        <div className='nice-line'></div>
                        <div className='title-watermark'>Blog & More</div>
                    </div>
                    <div className='feature-text'>
                        <Link to='/blog'>
                            Blog <i className='fal fa-long-arrow-right'></i>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <Spinning />
                ) : (
                    <Grid container spacing={0}>
                        <section>
                            <Grid container spacing={4} justify='center'>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    className='post-column'
                                >
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
                    </Grid>
                )}
            </section>
        </div>
    );
};

export default RecentPosts;
