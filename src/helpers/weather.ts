import { createReportId } from 'helpers';
import fetchAsync from 'helpers/fetch';

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
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    'us-epa-index': number;
    'gb-defra-index': number;
  };
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  cloud: number;
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
  is_current_location?: boolean;
  id?: string;
  notes?: Note[];
}

export interface Note {
  id?: string;
  body: string;
}

export interface WeatherReport extends Meta {
  location: ReportLocation;
  current: Report;
  last_refresh: number;
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

export const getReport = async (options: WeatherFetchOptions) => {
  const { name, lat, long, is_favorite, is_current_location, id, notes } =
    options;
  let query = name;
  if (!query) {
    query = `${lat},${long}`;
  }
  const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
    process.env;
  const url = `${REACT_APP_WEATHER_API_BASE_URL}/current.json?key=${REACT_APP_WEATHER_API_KEY}&q=${query}&aqi=yes`;

  const response = await fetchAsync<WeatherReport>({ url });
  if (response?.current) {
    response.last_refresh = new Date().getTime();
    response.is_current_location = !!is_current_location;
    response.is_favorite = !!is_favorite;
    if (!id) {
      response.id = createReportId(response.location);
    }
    if (!notes) {
      response.notes = notes || [];
    }
  }
  return response;
};

export const search = async (string: string) => {
  const { REACT_APP_WEATHER_API_BASE_URL, REACT_APP_WEATHER_API_KEY } =
    process.env;
  const url = `${REACT_APP_WEATHER_API_BASE_URL}/search.json?key=${REACT_APP_WEATHER_API_KEY}&q=${string}`;

  const response = await fetchAsync<ReportLocation[]>({ url });
  return response;
};

export const isSameLocation = (a: WeatherReport, b: WeatherReport) =>
  a && b && a.id === b.id;

export type UpdateOrAddFn = (
  newEntities: readonly WeatherReport[],
  state: readonly WeatherReport[]
) => WeatherReport[];

export const updateOrAdd: UpdateOrAddFn = (newEntities, state) => {
  const newState: WeatherReport[] = [...state.filter((report) => report.id)];

  for (const entity of newEntities) {
    if (!entity?.id) {
      continue;
    }
    let existing: WeatherReport | undefined;
    let index: number = 0;
    for (let i = 0; i < newState.length; i++) {
      const report = newState[i];
      if (isSameLocation(report, entity)) {
        existing = report;
        index = i;
        break;
      }
    }
    if (existing) {
      newState[index] = { ...existing, ...entity };
    } else {
      newState.push(entity);
    }
  }
  return newState;
};
