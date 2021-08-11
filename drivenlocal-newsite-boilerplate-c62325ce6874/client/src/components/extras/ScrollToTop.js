import { useEffect } from 'react';

const ScrollToTop = () => {
    useEffect(() => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            // just a fallback for older browsers
            window.scrollTo(0, 0);
        }
    }, []);

    // renders nothing, since nothing is needed
    return null;
};

export default ScrollToTop;
