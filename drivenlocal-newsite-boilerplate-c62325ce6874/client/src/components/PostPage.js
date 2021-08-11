import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

// Page parts
import PostBody from './blog/PostBody';
import Spinning from './extras/Spinning';
import ScrollToTop from './extras/ScrollToTop';
import PageHeaders from './layout/PageHeaders';

const PostPage = ({ match }) => {
    const [postsTop, setServicestop] = useState({
        title: '',
        img: '',
    });
    const [content, setContent] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function postContent() {
            const postsdata = axios.get(
                `https://vascularexperts.ferociousmediaweb.com/wp-json/wp/v2/posts`
            );

            Promise.all([postsdata]).then((res) => {
                res[0].data.forEach((d) => {
                    if (d.slug === match.params.slug) {
                        setServicestop({
                            title: d.title.rendered,
                            subtitle: d.date,
                            img: d.featured_media,
                        });
                        setContent(d.content.rendered);
                    }
                });

                setLoading(false);
            });
        }

        postContent();

        // eslint-disable-next-line
    }, [match.params.slug]);

    return (
        <div className='posts-pages-wrap'>
            {loading ? (
                <Spinning />
            ) : (
                <Fragment>
                    <ScrollToTop />
                    <PageHeaders header={postsTop} />
                    <PostBody content={content} />
                </Fragment>
            )}
        </div>
    );
};

export default PostPage;
