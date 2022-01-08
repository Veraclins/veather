import React, { useContext } from 'react';
import { Note, WeatherFetchOptions, WeatherReport } from 'helpers/Store';

interface WeatherContextProps {
  fetchNewReport: (
    options: WeatherFetchOptions
  ) => Promise<WeatherReport | undefined>;
  removeReport: (report: WeatherReport) => void;
  addOrUpdateNote: (reportId: string, note: Note) => void;
  deleteNote: (reportId: string, noteId: string) => void;
  getCurrent: (longitude: number, latitude: number) => Promise<void>;
  toggleFavorite: (report: WeatherReport) => void;
  reports: WeatherReport[];
  current?: WeatherReport;
}

export const WeatherContext = React.createContext<WeatherContextProps | null>(
  null
);
export const useWeatherContext = () =>
  useContext(WeatherContext) as WeatherContextProps;

export default WeatherContext;
