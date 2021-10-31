import { createId } from 'helpers';
import fetchAsync from './fetch';

export interface ReportLocation {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
  localtime_epoch: number;
}

export interface Report {
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  cloud: number;
  cloudcover: number;
  feelslike_c: number;
  feelslike_f: number;
  feelslike: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated_epoch: number;
  last_updated: string;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  temp_c: number;
  temp_f: number;
  uv_index: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  visibility: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}

interface Meta {
  is_favorite?: boolean;
  is_popular?: boolean;
  is_current_location?: boolean;
}

export interface WeatherReport extends Meta {
  location: ReportLocation;
  report: Report;
  last_refresh: number;
  id: string;
}

interface NameOptions extends Meta {
  name: string;
  lat?: number;
  long?: number;
}
interface CoordOptions extends Meta {
  name?: string;
  lat: number;
  long: number;
}

export type WeatherFetchOptions = NameOptions | CoordOptions;

export const getCurrent = async (options: WeatherFetchOptions) => {
  const { name, lat, long, is_favorite, is_current_location, is_popular } =
    options;
  let query = name;
  if (!query) {
    query = `${lat},${long}`;
  }
  const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
    process.env;
  console.log(REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY);
  const url = `${REACT_APP_WEATHER_API_BASE_URL}/current.json?key=${REACT_APP_WEATHER_API_KEY}&q=${query}`;

  const response = await fetchAsync<WeatherReport>({ url });
  if (response) {
    response.last_refresh = new Date().getTime();
    response.is_popular = !!is_popular;
    response.is_current_location = !!is_current_location;
    response.is_favorite = !!is_favorite;
    response.id = createId(response.location);
  }

  return response;
};

export const search = async (string: string) => {
  const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
    process.env;
  console.log(REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY);
  const url = `${REACT_APP_WEATHER_API_BASE_URL}/search.json?key=${REACT_APP_WEATHER_API_KEY}&q=${string}`;

  const response = await fetchAsync<ReportLocation[]>({ url });
  return response;
};

export const isSameLocation = (a: WeatherReport, b: WeatherReport) =>
  a.id === b.id;

export type UpdateOrAddFn = (
  newEntities: readonly WeatherReport[],
  state: readonly WeatherReport[]
) => WeatherReport[];

export const updateOrAdd: UpdateOrAddFn = (newEntities, state) => {
  const newState: WeatherReport[] = [...state];

  for (const entity of newEntities) {
    const newEntity = newState.find((report) => isSameLocation(report, entity));
    if (newEntity) {
      const index = newState.findIndex((report) =>
        isSameLocation(report, entity)
      );
      newState[index] = { ...newState[index], ...newEntity };
    } else {
      newState.push(entity);
    }
  }
  return newState;
};
