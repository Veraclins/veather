import React, { useEffect, useContext, useState } from 'react';

import { storage } from 'helpers/storage';
import {
  getCurrent,
  isSameLocation,
  updateOrAdd,
  UpdateOrAddFn,
  WeatherFetchOptions,
  WeatherReport,
} from 'helpers/weather';
import { cities } from 'helpers';
import { geoLocateMe } from 'helpers/location';
import { round } from 'helpers';

interface WeatherContextProps {
  fetchNewReport: (options: WeatherFetchOptions) => Promise<void>;
  removeReport: (report: WeatherReport) => void;
  toggleFavorite: (report: WeatherReport) => void;
  reports: WeatherReport[];
  favorites: WeatherReport[];
  current?: WeatherReport;
  popular: WeatherReport[];
}

export const WeatherContext = React.createContext<WeatherContextProps | null>(
  null
);
export const useWeather = () =>
  useContext(WeatherContext) as WeatherContextProps;

const WeatherProvider: React.FC = ({ children }) => {
  const [reports, setReports] = useState<WeatherReport[]>(
    storage.getItem('reports') || []
  );
  const [favorites, setFavorites] = useState<WeatherReport[]>([]);
  const [popular, setPopular] = useState<WeatherReport[]>([]);
  const [current, setCurrent] = useState<WeatherReport>();

  const oneDay = 86400000; // Refresh once a day

  const getTimeNow = () => new Date().getTime();

  const updateReport: UpdateOrAddFn = (newEntities, state) => {
    const data = updateOrAdd(newEntities, state);
    setReports(data);
    storage.setItem('reports', data);
    return data;
  };

  const fetchNewReport = async (options: WeatherFetchOptions) => {
    const report = await getCurrent(options);
    if (!report) return;
    updateReport([report], reports);
  };

  const removeReport = (report: WeatherReport) => {
    if (!report) return;
    const newReports = reports.filter((rep) => isSameLocation(rep, report));
    return updateReport([], newReports);
  };

  const toggleFavorite = (report: WeatherReport) => {
    if (!report) return;
    report.is_favorite = !report.is_favorite;
    return updateReport([report], reports);
  };

  useEffect(() => {
    const loadPopularReports = async () => {
      const now = getTimeNow();
      const popularReports = reports.filter((report) => report.is_popular);

      const oldest = Math.max(
        ...popularReports.map((report) => report.last_refresh)
      );

      if (popularReports.length < 15 || now - oldest > oneDay) {
        const mostPopulated = cities.slice(0, 15);
        const newReports = (await Promise.all(
          mostPopulated.map((city) =>
            getCurrent({ name: city.Name, is_popular: true })
          )
        )) as WeatherReport[];
        return updateReport(newReports, reports);
      }
    };
    loadPopularReports();
  }, [reports]);

  useEffect(() => {
    const loadCurrentLocationReport = async (
      longitude: number,
      latitude: number
    ) => {
      const now = getTimeNow();
      const currentLocation = reports.find(
        (report) => report.is_current_location
      );
      if (
        !currentLocation ||
        currentLocation.location.lat !== latitude ||
        currentLocation.location.lon !== longitude ||
        now - currentLocation.last_refresh > oneDay
      ) {
        await fetchNewReport({
          lat: latitude,
          long: longitude,
          is_current_location: true,
        });
      }
    };
    geoLocateMe((position) => {
      loadCurrentLocationReport(
        round(position.coords.longitude),
        round(position.coords.latitude)
      );
    });
  }, [reports]);

  useEffect(() => {
    const currentLocation = reports.find(
      (report) => report.is_current_location
    );
    const fav = reports.filter((report) => report.is_favorite);
    const pop = reports.filter((report) => report.is_popular);
    setCurrent(currentLocation);
    setFavorites(fav);
    setPopular(pop);
  }, [reports]);

  return (
    <WeatherContext.Provider
      value={{
        fetchNewReport,
        reports,
        current,
        favorites,
        popular,
        removeReport,
        toggleFavorite,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
