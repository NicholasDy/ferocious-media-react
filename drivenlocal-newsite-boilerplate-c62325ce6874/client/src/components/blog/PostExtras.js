import React from 'react';

import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const PostExtras = () => {
    return (
        <div className='service-extra-content'>
            <section>
                <Grid container justify='center'>
                    <Grid item xs={10} sm={8}>
                        <section>
                            <h3>Our Blog</h3>
                            <p>
                                Did you like this post? Click the button below
                                to read more helful information from Steamatic
                                Restoration &amp; Cleaning
                            </p>
                            <div
                                style={{
                                    textAlign: 'center',
                                    display: 'block',
                                    marginTop: 30,
                                }}
                            >
                                <Link
                                    to='/blog'
                                    className='big-red-button'
                                    style={{ display: 'inline-block' }}
                                >
                                    Visit Our Blog
                                </Link>
                            </div>
                        </section>
                    </Grid>
                </Grid>
            </section>
        </div>
    );
};

export default PostExtras;
