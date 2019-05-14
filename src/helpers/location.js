const DEFAULT_POSITION = { coords: { latitude: 49.432, longitude: 32.083 } };

function convertCoordinates(position) {
  const { latitude, longitude } = position.coords;
  return { lon: longitude, lat: latitude };
}

function getLocation(onPreciseLocation = () => {}) {
  if (navigator.geolocation) {
    const wrappedCallback = position => onPreciseLocation(convertCoordinates(position));
    navigator.geolocation.getCurrentPosition(wrappedCallback);
  }
}

function getDefaultLocation() {
  return convertCoordinates(DEFAULT_POSITION);
}

export { getLocation, getDefaultLocation };
