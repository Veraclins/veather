import WeatherListCard from 'components/WeatherListCard';
import { useWeatherContext } from 'context/WeatherContext';
import React from 'react';

interface Props {}

const Cities: React.FC<Props> = () => {
  const { favorites, others } = useWeatherContext();

  return (
    <div className="card my-3">
      <div className="card-body">
        {[...favorites, ...others].map((report) => (
          <WeatherListCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default Cities;
