import { useWeatherContext } from 'context/WeatherContext';
import React, { useEffect, useState } from 'react';
import CityPage from 'components/CityPage';
import { geoLocateMe } from 'helpers/location';
import { roundToTwo } from 'helpers';
import { WeatherReport } from 'helpers/Store';

const Current: React.FC = () => {
  const { current, getCurrent } = useWeatherContext();

  const [report, setReport] = useState<WeatherReport>();

  useEffect(() => {
    const loadCurrentLocationReport = async (
      longitude: number,
      latitude: number
    ) => {
      await getCurrent(longitude, latitude);
    };

    if (!current) {
      geoLocateMe((position) => {
        loadCurrentLocationReport(
          roundToTwo(position.coords.longitude),
          roundToTwo(position.coords.latitude)
        );
      });
    }
  }, [current]);

  useEffect(() => {
    if (current) setReport(current);
  }, [current]);

  return <CityPage report={report} />;
};

export default Current;
