export const geoLocateMe = (callback: PositionCallback) => {
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(
      callback,
      () => {
        console.error('Something is not right!');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 20000,
      }
    );
  }
};
