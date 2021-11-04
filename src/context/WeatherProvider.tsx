import React, { useEffect, useContext, useState, useCallback } from 'react';

import { storage } from 'helpers/storage';
import {
  getReport,
  isSameLocation,
  Note,
  updateOrAdd,
  UpdateOrAddFn,
  WeatherFetchOptions,
  WeatherReport,
} from 'helpers/weather';
import { cities, compareReportAscending, createUniqueId } from 'helpers';
import { geoLocateMe } from 'helpers/location';
import { roundToTwo } from 'helpers';
import { useHistory } from 'react-router';

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
export const useWeather = () =>
  useContext(WeatherContext) as WeatherContextProps;

const WeatherProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [reports, setReports] = useState<WeatherReport[]>(
    storage.getItem('reports') || []
  );
  const [all, setAll] = useState<WeatherReport[]>([]);
  const [favorites, setFavorites] = useState<WeatherReport[]>([]);
  const [others, setOthers] = useState<WeatherReport[]>([]);
  const [current, setCurrent] = useState<WeatherReport>(
    storage.getItem('current')
  );

  const oneHour = 3600000; // Refresh once a day

  const getTimeNow = () => new Date().getTime();

  const updateReport: UpdateOrAddFn = (newEntities, state) => {
    const data = updateOrAdd(newEntities, state);
    setReports(data);
    storage.setItem('reports', data);
    return data;
  };

  const fetchNewReport = useCallback(
    async (options: WeatherFetchOptions) => {
      const report = await getReport(options);
      if (!report) return;
      updateReport([report], reports);
      return report;
    },
    [reports]
  );

  const removeReport = (report: WeatherReport) => {
    if (!report) return;
    const newReports = reports.filter((rep) => !isSameLocation(rep, report));
    return updateReport([], newReports);
  };

  const updateCurrent = (report: WeatherReport) => {
    setCurrent(report);
    storage.setItem('current', report);
  };

  const toggleFavorite = (report: WeatherReport) => {
    if (!report) return;
    report.is_favorite = !report.is_favorite;
    return updateReport([report], reports);
  };

  const addOrUpdateNote = (report_id: string, note: Note) => {
    const report = all.find((rep) => rep.id === report_id);
    if (!report) return;
    if (!report.notes) {
      report.notes = [];
    }
    if (!note.id) {
      note.id = createUniqueId(note.body);
      report.notes.push(note);
    } else {
      const index = report.notes.findIndex((not) => not.id === note.id);
      report.notes[index] = note;
    }
    if (report.id === current.id) {
      return updateCurrent(report);
    }
    return updateReport([report], reports);
  };

  const deleteNote = (report_id: string, note: Note) => {
    const report = reports.find((rep) => rep.id === report_id);
    if (!report) return;
    if (!report.notes) return;
    report.notes = report.notes.filter((not) => not.id !== note.id);
    if (report.id === current.id) {
      return updateCurrent(report);
    }
    return updateReport([report], reports);
  };

  useEffect(() => {
    const loadPopularReports = async () => {
      const now = getTimeNow();

      const oldest = Math.max(...reports.map((report) => report.last_refresh));
      let options: WeatherFetchOptions[] = [];
      if (!reports.length) {
        const mostPopulated = cities.slice(0, 15);
        options = mostPopulated.map((city) => ({ name: city.Name }));
      } else {
        options = reports.map((report) => ({
          name: report.location.name,
          is_favorite: report.is_favorite,
          id: report.id,
          notes: report.notes,
        }));
      }
      if (now - oldest > oneHour) {
        const newReports = (await Promise.all(
          options.map((option) => getReport(option))
        )) as WeatherReport[];
        return updateReport(newReports, reports);
      }
    };
    loadPopularReports();
  }, []);

  useEffect(() => {
    const loadCurrentLocationReport = async (
      longitude: number,
      latitude: number
    ) => {
      const now = getTimeNow();
      if (
        !current ||
        current.location.lat !== latitude ||
        current.location.lon !== longitude ||
        now - current.last_refresh > oneHour
      ) {
        const report = await getReport({
          lat: latitude,
          long: longitude,
          id: current?.id,
          notes: current?.notes,
          is_current_location: true,
        });
        if (!report) return;
        updateCurrent(report);
        history.push('/cities/current');
      }
    };
    geoLocateMe((position) => {
      loadCurrentLocationReport(
        roundToTwo(position.coords.longitude),
        roundToTwo(position.coords.latitude)
      );
    });
  }, []);

  useEffect(() => {
    const fav: WeatherReport[] = [];
    const other: WeatherReport[] = [];
    for (const report of reports) {
      if (report.is_favorite) {
        fav.push(report);
      } else {
        other.push(report);
      }
    }
    setFavorites(fav.sort(compareReportAscending));
    setOthers(other.sort(compareReportAscending));
  }, [reports]);

  useEffect(() => {
    const data = [...reports];
    if (current) {
      data.push(current);
    }
    setAll(data);
  }, [reports, current]);

  return (
    <WeatherContext.Provider
      value={{
        others,
        reports,
        current,
        favorites,
        deleteNote,
        removeReport,
        updateCurrent,
        toggleFavorite,
        fetchNewReport,
        addOrUpdateNote,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
