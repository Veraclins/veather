import { WeatherReport } from 'helpers/weather';
import React from 'react';
import { useHistory } from 'react-router';
interface Props {
  report: WeatherReport;
}

const WeatherListCard: React.FC<Props> = ({ report }) => {
  const history = useHistory();

  const gotoDetailsPage = () => {
    console.log(report);
    history.push(`/cities/${report.id}`);
  };
  const region = report.location.region
    ? `${report.location.region}, ${report.location.country}`
    : report.location.country;
  return (
    <div onClick={gotoDetailsPage} className="card">
      <div className="flex justify-between">
        <div className="flex-column">
          <div className="text-lg text-bold">{report.location.name}</div>
          <div className="text-md italic">{region}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherListCard;
