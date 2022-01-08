import Notes from 'components/Notes';
import { useWeatherContext } from 'context/WeatherContext';
import { formatNumber } from 'helpers';
import { WeatherReport } from 'helpers/Store';
import React from 'react';

const epaIndex: { [key: number]: string } = {
  1: 'Good',
  2: 'Moderate',
  3: 'Unhealthy for sensitive group',
  4: 'Unhealthy',
  5: 'Very Unhealthy',
  6: 'Hazardous',
};

interface Props {
  report?: WeatherReport;
}

const CityPage: React.FC<Props> = ({ report }) => {
  const { toggleFavorite, current } = useWeatherContext();

  const region = report
    ? report.location.region
      ? `${report.location.region}, ${report.location.country}`
      : report.location.country
    : '';

  return (
    <div className="card no-shadow">
      {report ? (
        <>
          <div className="card-head">
            <div className="flex justify-between">
              {report.location.name}
              <button
                className={`text-white rounded-sm flex items-center justify-center px-3 ${
                  report.is_favorite ? 'bg-yellow text-gray' : 'bg-blue'
                }`}
                onClick={() => toggleFavorite(report)}
                data-testid="favorite-report"
              >
                {report.is_favorite ? (
                  <span>Remove from favorites</span>
                ) : (
                  <span>Add to favorites</span>
                )}
              </button>
            </div>
            <div className="text-md text-normal italic">
              {region}
              {report.id === current?.id && (
                <span className="ml-2 text-light">(Your current location)</span>
              )}
            </div>
          </div>

          <div className="py-2">
            <div className="flex flex-column md-flex-row">
              <div className="flex flex-column md-flex-3 card p-3">
                <div className="flex flex-column md-flex-row justify-between">
                  <div className="flex flex-column flex-1 items-center md-border-r-1 border-light-gray">
                    <div className="flex flex-column w-100 justify-between items-center md-pr-4 py-3 h-50">
                      <div className="flex flex-column items-center">
                        <img
                          src={report.data.condition.icon}
                          alt={report.data.condition.text}
                          width="120"
                          height="120"
                        />
                        <span>{report.data.condition.text}</span>
                      </div>
                      <div className="text-huge text-2xl md-text-3xl">
                        <span className="px-2">
                          {report.data.temp_c}
                          <sup>o</sup>C
                        </span>
                        •
                        <span className="px-2">
                          {report.data.temp_f}
                          <sup>o</sup>F
                        </span>
                      </div>
                    </div>
                    <div className="flex w-100 justify-between items-center h-50 py-3 border-t-1 border-light-gray md-pr-4">
                      <div className="flex flex-column w-100">
                        <h2>Wind</h2>
                        <ul>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">Wind speed</span>
                            <span className="text-normal">
                              {report.data.wind_mph} mi/h •{' '}
                              {report.data.wind_kph} km/h
                            </span>
                          </li>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">Wind Direction</span>
                            <span className="text-normal">
                              {report.data.wind_degree}
                              <sup>o</sup> {report.data.wind_dir}
                            </span>
                          </li>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">Wind Gust</span>
                            <span className="text-normal">
                              {report.data.gust_mph} mi/h •{' '}
                              {report.data.gust_kph} km/h
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-column flex-1 items-center">
                    <div className="flex w-100 justify-between items-center h-50 py-3 md-pl-4 border-t-1 md-border-t-0 border-light-gray">
                      <div className="flex flex-column w-100">
                        <h2>Pressure and humidity</h2>
                        <ul>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">
                              Pressure in millibars
                            </span>
                            <span className="text-normal">
                              {report.data.pressure_mb} mb
                            </span>
                          </li>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">
                              Pressure in inches
                            </span>
                            <span className="text-normal">
                              {report.data.pressure_in}
                              <sup>"</sup>
                            </span>
                          </li>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">Humidity</span>
                            <span className="text-normal">
                              {report.data.humidity}%
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex w-100 justify-between items-center h-50 py-3 border-t-1 border-light-gray md-pl-4">
                      <div className="flex flex-column w-100">
                        <h2>Precipitation and Cloud</h2>
                        <ul>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">
                              Precipitation in millimeters
                            </span>
                            <span className="text-normal">
                              {formatNumber(report.data.precip_mm)} mm
                            </span>
                          </li>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">
                              Precipitation in inches
                            </span>
                            <span className="text-normal">
                              {formatNumber(report.data.precip_in)}
                              <sup>"</sup>
                            </span>
                          </li>
                          <li className="flex justify-between w-100 pb-3">
                            <span className="text-bold">Cloud cover</span>
                            <span className="text-normal">
                              {report.data.cloud}%
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-100 justify-between items-center md-h-50 py-3 border-t-1 border-light-gray">
                  <div className="flex flex-column w-100">
                    <h2>
                      Air Quality{' '}
                      <span className="text-md italic">
                        ({epaIndex[report.data.air_quality['us-epa-index']]})
                      </span>
                    </h2>

                    <div className="flex flex-column md-flex-row w-100 justify-between">
                      <div className="flex flex-1 justify-between md-pr-4 flex-wrap">
                        <div className="flex flex-column w-50 md-w-20 pb-2 md-pb-0">
                          <span className="text-bold whitespace-nowrap">
                            Carbon Monoxide
                          </span>
                          <span className="text-normal">
                            {formatNumber(report.data.air_quality.co)} μg/m3
                          </span>
                        </div>
                        <div className="flex flex-column w-50 md-w-20 pb-2 md-pb-0">
                          <span className="text-bold whitespace-nowrap">
                            Nitrogen dioxide
                          </span>
                          <span className="text-normal">
                            {formatNumber(report.data.air_quality.no2)} μg/m3
                          </span>
                        </div>
                        <div className="flex flex-column w-50 md-w-20 py-2 md-py-0">
                          <span className="text-bold whitespace-nowrap">
                            Sulphur dioxide
                          </span>
                          <span className="text-normal">
                            {formatNumber(report.data.air_quality.so2)} μg/m3
                          </span>
                        </div>
                        <div className="flex flex-column w-50 md-w-20 py-2 md-py-0">
                          <span className="text-bold whitespace-nowrap">
                            PM2.5
                          </span>
                          <span className="text-normal">
                            {formatNumber(report.data.air_quality.pm2_5)} μg/m3
                          </span>
                        </div>
                        <div className="flex flex-column w-50 md-w-20 pt-2 md-pt-0">
                          <span className="text-bold whitespace-nowrap">
                            PM10
                          </span>
                          <span className="text-normal">
                            {formatNumber(report.data.air_quality.pm10)} μg/m3
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md-flex-1 card mt-3 md-mt-0 md-ml-3">
                <Notes report={report} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-2xl flex justify-center items-center h-100">
          No report? please use the search field above.
        </div>
      )}
    </div>
  );
};

export default CityPage;
