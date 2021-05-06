import React from 'react';
import GoogleMapReact from 'google-map-react';
import controllable from 'react-controllables';

import { config } from "@config";

const Marker = ({ text }) => <div style={{ background: "red", width: "25px", height: "25px" }}>{text}</div>;

const defaultProps = {
    center: {
        lat: 3.140853,
        lng: 101.693207
    },
    zoom: 12
};

const createMapOptions = (maps) => {
    return {
      zoomControlOptions: {
        position: maps.ControlPosition.RIGHT_CENTER,
        style: maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT
      },
      mapTypeControl: true
    };
  }

// @controllable(['center', 'zoom', 'hoverKey', 'clickKey'])  
const Map = props => {

    const { locations = [], latKey = "lat", longKey = "lng", hoverComponent = "" } = props;

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.GOOGLE_MAPS_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={createMapOptions}
            >
                {locations.map(location => (
                    <Marker
                        lat={location[latKey]}
                        lng={location[longKey]}
                        text="My Marker"
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;
