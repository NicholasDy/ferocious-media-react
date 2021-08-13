import { Grid } from '@material-ui/core';
import React from 'react';
import Spinning from '../extras/Spinning';

const BodyPages = ({ content, loading }) => {
    return (
        <div className='section-fw-dividers'>
            <section>
                {loading ? (
                    <Spinning />
                ) : (
                    <Grid container spacing={7} justify='center'>
                        <Grid item xs={10} sm={8}>
                            <div
                                dangerouslySetInnerHTML={{ __html: content }}
                                className='content-body'
                            ></div>
                        </Grid>
                    </Grid>
                )}
            </section>
        </div>
    );
};

export default BodyPages;
