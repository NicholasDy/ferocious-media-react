import React, { Fragment } from 'react';
import { compose, withProps } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';

import LogoSvg from '../../images/map-marker-plus-regular.svg';

const data = {
    center: {
        lat: 41.4397016,
        lng: -74.0525521,
    },
    zoom: 14,
};

const locationone = {
    center: {
        lat: 41.4397016,
        lng: -74.0525521,
    },
};

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDoronmUKLLNU5PkhtG8Hmm95BClwSH5Y&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: 400 }} />,
        containerElement: (
            <div
                style={{
                    height: `100%`,
                    minHeight: 400,
                    borderRadius: 5,
                    overflow: 'hidden',
                    boxShadow: '0 0 25px rgba(0,0,0,0.2)',
                }}
            />
        ),
        mapElement: <div style={{ height: 400 }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap
        defaultZoom={data.zoom}
        defaultCenter={{ lat: data.center.lat, lng: data.center.lng }}
    >
        <Fragment>
            {props.isMarkerShown && (
                <div className='marker-style'>
                    <Marker
                        icon={{
                            url: `${LogoSvg}`,
                        }}
                        position={{
                            lat: locationone.center.lat,
                            lng: locationone.center.lng,
                        }}
                    />
                </div>
            )}
        </Fragment>
    </GoogleMap>
));

const ContactMap = (props) => {
    return <MyMapComponent isMarkerShown />;
};

export default ContactMap;
