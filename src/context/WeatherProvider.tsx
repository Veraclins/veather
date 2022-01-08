import React, { useCallback, useEffect, useState } from 'react';
import WeatherContext from 'context/WeatherContext';
import { getReport } from 'helpers/weather';
import Store, {
  APIReport,
  Note,
  WeatherFetchOptions,
  WeatherReport,
} from 'helpers/Store';
import { cities } from 'helpers';
import { geoLocateMe } from 'helpers/location';
import { roundToTwo } from 'helpers';
import { useHistory } from 'react-router';
import { storage } from 'helpers/storage';

interface Coordinates {
  longitude: number;
  latitude: number;
}

const findCurrent = (reps: WeatherReport[], coordinates?: Coordinates) =>
  reps.find(
    (rep) =>
      rep.location.lat === coordinates?.latitude &&
      rep.location.lon === coordinates?.longitude
  );

const WeatherProvider: React.FC<{ cached: WeatherReport[] }> = ({
  cached,
  children,
}) => {
  const history = useHistory();
  const [reports, setReports] = useState<WeatherReport[]>(cached);
  const [coordinates, setCoordinates] = useState<Coordinates>(
    storage.getItem('coordinates')
  );

  const [current, setCurrent] = useState<WeatherReport | undefined>(
    findCurrent(cached, coordinates)
  );

  const [hasUpdate, setHasUpdate] = useState(false);

  const oneHour = 3600000; // Refreshes every hour

  const getTimeNow = () => Date.now();

  const fetchNewReport = useCallback(async (options: WeatherFetchOptions) => {
    const report = await getReport(options);
    if (!report) return;
    const dataStore = new Store();
    const saved = dataStore.addReport(report);
    setHasUpdate(true);
    return saved;
  }, []);

  const removeReport = (report: WeatherReport) => {
    if (!report.id) return;
    const dataStore = new Store();
    dataStore.deleteReport(report.id);
    setHasUpdate(true);
  };

  const toggleFavorite = (report: WeatherReport) => {
    if (!report.id) return;
    const dataStore = new Store();
    dataStore.toggleReportFavorite(report.id);
    setHasUpdate(true);
  };

  const addOrUpdateNote = (reportId: string, note: Note) => {
    const dataStore = new Store();
    dataStore.addOrEditReportNote(reportId, note);
    setHasUpdate(true);
  };

  const deleteNote = (reportId: string, noteId: string) => {
    const dataStore = new Store();
    dataStore.deleteReportNote(reportId, noteId);
    setHasUpdate(true);
  };

  const getCurrent = async (longitude: number, latitude: number) => {
    const response = await getReport({
      lat: latitude,
      long: longitude,
    });
    if (!response) return;

    const dataStore = new Store();
    const report = dataStore.addReport(response);
    setCurrent(report);
    setHasUpdate(true);
  };

  const getReports = async (names: string[]) => {
    const options = names.map((name) => ({ name: name }));

    const newReports = await Promise.all(
      options.map((option) => getReport(option))
    );
    const saved = newReports.filter((rep) => rep !== null) as APIReport[];
    const dataStore = new Store();
    dataStore.addManyReports(saved);
    setHasUpdate(true);
  };
  const refetch = async () => {
    const dataStore = new Store();
    const storeReports = dataStore.getState();
    const names = storeReports
      .filter((rep) => getTimeNow() - rep.last_refresh > oneHour)
      .map((rep) => rep.location.name);
    getReports(names);
  };

  useEffect(() => {
    const loadPopularReports = async () => {
      const mostPopulated = cities.slice(0, 15);
      const names = mostPopulated.map((city) => city.Name);
      getReports(names);
    };
    if (!reports.length) loadPopularReports();
  }, [reports]);

  useEffect(() => {
    const loadCurrentLocationReport = async (
      longitude: number,
      latitude: number
    ) => {
      if (
        !current ||
        current.location.lat !== latitude ||
        current.location.lon !== longitude
      ) {
        await getCurrent(longitude, latitude);
        history.push('/cities/current');
      }
    };
    if (coordinates)
      loadCurrentLocationReport(
        roundToTwo(coordinates.longitude),
        roundToTwo(coordinates.latitude)
      );
  }, [current, coordinates, history]);

  useEffect(() => {
    geoLocateMe((position) => {
      const coords = {
        longitude: roundToTwo(position.coords.longitude),
        latitude: roundToTwo(position.coords.latitude),
      };
      setCoordinates(coords);
      storage.setItem('coordinates', coords);
    });
    const interval = setInterval(() => {
      refetch();
    }, 600000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (hasUpdate) {
      const dataStore = new Store();
      const storeReports = dataStore.getState();
      setReports(storeReports);
      const currentReport = findCurrent(storeReports, coordinates);
      if (currentReport) setCurrent(currentReport);
      setHasUpdate(false);
    }
  }, [coordinates, hasUpdate]);

  return (
    <WeatherContext.Provider
      value={{
        reports,
        current,
        getCurrent,
        deleteNote,
        removeReport,
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
