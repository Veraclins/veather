import { useWeatherContext } from 'context/WeatherContext';
import { WeatherReport } from 'helpers/weather';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CityPage from 'components/CityPage';

interface Props {}

const City: React.FC<Props> = () => {
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
