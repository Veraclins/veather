import WeatherListCard from 'components/WeatherListCard';
import { useWeather } from 'context/WeatherProvider';
import React from 'react';

interface Props {}

const Cities: React.FC<Props> = () => {
  const { reports, favorites, popular, current } = useWeather();

  return (
    <div>
      <h2>Current Location</h2>

      {current ? (
        <WeatherListCard report={current} />
      ) : (
        <div>
          Your current location report will appear here when you give permission
          to read your location
        </div>
      )}

      <h2>Favorites</h2>
      {favorites.length ? (
        favorites.map((report) => (
          <WeatherListCard key={report.id} report={report} />
        ))
      ) : (
        <div> Your favorite cities will appear here</div>
      )}
      <h2>Popular cities around the world</h2>
      {popular.map((report) => (
        <WeatherListCard key={report.id} report={report} />
      ))}
    </div>
  );
};

export default Cities;
