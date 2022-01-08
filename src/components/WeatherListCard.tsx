import { WeatherReport } from 'helpers/Store';
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
      className="list-item px-2 py-2 md-px-3 flex flex-wrap justify-between"
    >
      <div className="flex flex-column flex-2 justify-center whitespace-nowrap">
        <div className="text-lg text-bold">{report.location.name}</div>
        <div className="text-md italic">{region}</div>
      </div>
      <div className="flex w-100 md-flex-3 py-2 md-py-0 justify-between">
        <div className="flex flex-column flex-3 justify-center">
          <div className="text-lg">Temperature</div>
          <div className="text-md italic">
            <span className="pr-1">
              {report.data.temp_c}
              <sup>o</sup>C
            </span>
            <span className="pl-1">
              {report.data.temp_f}
              <sup>o</sup>F
            </span>
          </div>
        </div>
        <div className="flex flex-column flex-2">
          <img
            src={report.data.condition.icon}
            alt={report.data.condition.text}
            width="36"
            height="36"
          />
          <span>{report.data.condition.text}</span>
        </div>
        <div
          className="flex justify-end items-center flex-1 pl-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={`text-white rounded-full h-4 w-4 p-2 flex items-center justify-center mr-2 md-mr-3 ${
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
    </div>
  );
};

export default WeatherListCard;
