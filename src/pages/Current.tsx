import { useWeatherContext } from 'context/WeatherContext';
import { getReport } from 'helpers/weather';
import React, { useEffect, useState } from 'react';
import CityPage from 'components/CityPage';
import { geoLocateMe } from 'helpers/location';
import { roundToTwo } from 'helpers';

interface Props {}

const Current: React.FC<Props> = () => {
  const { current, updateCurrent } = useWeatherContext();

  const [report, setReport] = useState(current);

  useEffect(() => {
    const loadCurrentLocationReport = async (
      longitude: number,
      latitude: number
    ) => {
      const response = await getReport({
        lat: latitude,
        long: longitude,
        id: current?.id,
        notes: current?.notes,
        is_current_location: true,
      });
      if (!response) return;
      if (current?.notes) {
        response.notes = current.notes;
      }
      updateCurrent(response);
    };
    if (!current) {
      geoLocateMe((position) => {
        loadCurrentLocationReport(
          roundToTwo(position.coords.longitude),
          roundToTwo(position.coords.latitude)
        );
      });
    }
  }, []);

  useEffect(() => {
    setReport(current);
  }, [current]);

  return <CityPage report={report} />;
};

export default Current;
