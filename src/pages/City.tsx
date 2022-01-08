import { useWeatherContext } from 'context/WeatherContext';
import { WeatherReport } from 'helpers/Store';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CityPage from 'components/CityPage';

const City: React.FC = () => {
  const params = useParams<{ city_id: string }>();
  const { reports } = useWeatherContext();

  const [report, setReport] = useState<WeatherReport>();

  useEffect(() => {
    const { city_id } = params;
    const currentReport = reports.find((report) => report.id === city_id);
    setReport(currentReport);
  }, [params, reports]);

  return <CityPage report={report} />;
};

export default City;
