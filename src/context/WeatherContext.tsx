import React, { useContext } from 'react';
import { Note, WeatherFetchOptions, WeatherReport } from 'helpers/weather';

interface WeatherContextProps {
  fetchNewReport: (
    options: WeatherFetchOptions
  ) => Promise<WeatherReport | undefined>;
  removeReport: (report: WeatherReport) => void;
  updateCurrent: (report: WeatherReport) => void;
  addOrUpdateNote: (report_id: string, note: Note) => void;
  deleteNote: (report_id: string, note: Note) => void;
  toggleFavorite: (report: WeatherReport) => void;
  reports: WeatherReport[];
  favorites: WeatherReport[];
  current?: WeatherReport;
  others: WeatherReport[];
}

export const WeatherContext = React.createContext<WeatherContextProps | null>(
  null
);
export const useWeatherContext = () =>
  useContext(WeatherContext) as WeatherContextProps;

export default WeatherContext;
