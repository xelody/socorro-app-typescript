import React from 'react';
import PropTypes from 'prop-types';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

import {DiveEntry} from '../../../../types/DiveEntry';

interface DiveEntriesOptions {
  dives: DiveEntry[];
}

function getDiveMarkers(dives: DiveEntry[]) {
  const diveMarkers = dives.map((dive, index) => (
    <Marker
      key={`dive-marker-${index}`}
      position={[
        dive?.location?.coordinates?.[0] || 0,
        dive?.location?.coordinates?.[1] || 0,
      ]}
    >
      <Popup>{dive.summary}</Popup>
    </Marker>
  ));
  return diveMarkers;
}

export default function DiveEntries({dives}: DiveEntriesOptions) {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {getDiveMarkers(dives)}
    </MapContainer>
  );
}

DiveEntries.prototype = {
  dives: PropTypes.arrayOf(PropTypes.object),
};
