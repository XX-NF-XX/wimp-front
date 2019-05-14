import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Circle, Map, TileLayer, Marker } from 'react-leaflet';

function MapStatic(props) {
  const { location, defaultZoom, radius, draggable, locationHandler, height } = props;

  const [marker, setMarker] = useState(location);
  const [zoom, setZoom] = useState(defaultZoom);

  useEffect(() => {
    const { lon: lng, lat } = location;
    setMarker({ lng, lat });
  }, [location]);

  const updatePosition = e => {
    const { lng: lon, lat } = e.target.getLatLng();
    locationHandler({ lon, lat });
  };

  const updateZoom = e => {
    setZoom(e.target.getZoom());
  };

  return (
    <Map center={location} zoom={zoom} onZoomend={updateZoom} style={{ height }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker draggable={draggable} onDragend={updatePosition} position={marker} />
      <Circle center={marker} fillColor='lightgreen' color='lightgreen' radius={radius} />
    </Map>
  );
}

MapStatic.propTypes = {
  location: PropTypes.shape({
    lon: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
  }).isRequired,
  defaultZoom: PropTypes.number,
  radius: PropTypes.number,
  draggable: PropTypes.bool,
  locationHandler: PropTypes.func,
  height: PropTypes.string,
};

MapStatic.defaultProps = {
  defaultZoom: 16,
  radius: 0,
  draggable: true,
  locationHandler: () => {},
  height: '400px',
};

export default MapStatic;
