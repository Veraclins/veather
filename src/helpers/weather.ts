import fetchAsync from 'helpers/fetch';
import { WeatherFetchOptions, ReportLocation, APIReport } from 'helpers/Store';

export const getReport = async (options: WeatherFetchOptions) => {
  const { name, lat, long } = options;
  let query = name;
  if (!query) {
    query = `${lat},${long}`;
  }
  const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
    process.env;
  const url = `${REACT_APP_WEATHER_API_BASE_URL}/current.json?key=${REACT_APP_WEATHER_API_KEY}&aqi=yes&q=${query}`;

  const response = await fetchAsync<APIReport>({ url });

  return response;
};

export const search = async (string: string) => {
  const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
    process.env;
  const url = `${REACT_APP_WEATHER_API_BASE_URL}/search.json?key=${REACT_APP_WEATHER_API_KEY}&q=${string}`;

  const response = await fetchAsync<ReportLocation[]>({ url });
  return response;
};
