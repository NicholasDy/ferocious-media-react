import React from 'react';

import { Grid } from '@material-ui/core';

const PostBody = ({ content }) => {
    return (
        <div className='internaal-pages-content blog-post'>
            <section>
                <Grid container spacing={5} justify='center'>
                    <Grid item xs={12} sm={8}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                            className='service-content-div'
                        ></div>
                    </Grid>
                </Grid>
            </section>
        </div>
    );
};

export default PostBody;
