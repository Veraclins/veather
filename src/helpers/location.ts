export const geoLocateMe = (callback: PositionCallback) => {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(
      callback,
      () => {
        console.log('Something is not right!');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60000,
        timeout: 20000,
      }
    );
  }
};
