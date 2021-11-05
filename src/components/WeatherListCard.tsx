import { WeatherReport } from 'helpers/weather';
import React from 'react';
import { useHistory } from 'react-router';
import { ReactComponent as DeleteIcon } from 'assets/delete.svg';
import { ReactComponent as FavoriteIcon } from 'assets/favorite.svg';
import { ReactComponent as FavoriteBorderIcon } from 'assets/favorite_border.svg';
import { useWeatherContext } from 'context/WeatherContext';

interface Props {
  report: WeatherReport;
}

const WeatherListCard: React.FC<Props> = ({ report }) => {
  const history = useHistory();
  const { toggleFavorite, removeReport } = useWeatherContext();

  const gotoDetailsPage = () => {
    history.push(`/cities/${report.id}`);
  };
  const region = report.location.region
    ? `${report.location.region}, ${report.location.country}`
    : report.location.country;

  return (
    <div
      onClick={gotoDetailsPage}
      className="list-item px-4 flex flex-column md-flex-row justify-between"
    >
      <div className="flex flex-column flex-4">
        <div className="text-lg text-bold">{report.location.name}</div>
        <div className="text-md italic">{region}</div>
      </div>
      <div className="flex md-flex-3 py-3 md-py-1">
        <div className="flex flex-column">
          <div className="text-lg">Latest temperature</div>
          <div className="text-md italic">
            <span className="pr-1">
              {report.current.temp_c}
              <sup>o</sup>C
            </span>
            <span className="pl-1">
              {report.current.temp_f}
              <sup>o</sup>F
            </span>
          </div>
        </div>
        <div className="flex flex-column pl-4">
          <img
            src={report.current.condition.icon}
            alt={report.current.condition.text}
            width="36"
            height="36"
          />
          <span>{report.current.condition.text}</span>
        </div>
      </div>
      <div
        className="flex justify-end items-center flex-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`text-white rounded-full h-4 w-4 p-2 flex items-center justify-center mr-3 ${
            report.is_favorite ? 'bg-yellow' : 'bg-blue'
          }`}
          onClick={() => toggleFavorite(report)}
          data-testid="favorite-report"
        >
          {report.is_favorite ? (
            <FavoriteBorderIcon data-testid="favorite-icon" />
          ) : (
            <FavoriteIcon data-testid="not-favorite-icon" />
          )}
        </button>

        <button
          className="bg-red text-white rounded-full h-4 w-4 p-2 flex items-center justify-center"
          onClick={() => removeReport(report)}
          data-testid="delete-report"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default WeatherListCard;
