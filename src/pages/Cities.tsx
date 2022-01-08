import WeatherListCard from 'components/WeatherListCard';
import { useWeatherContext } from 'context/WeatherContext';
import { compareReportAscending } from 'helpers';
import { WeatherReport } from 'helpers/Store';
import React, { useEffect, useState } from 'react';

const Cities: React.FC = () => {
  const { reports } = useWeatherContext();
  const [combined, setCombined] = useState<WeatherReport[]>([]);
  const [filteredBy, setFilteredBy] = useState<
    'favorites' | 'hasNotes' | 'all'
  >('all');
  const [filtered, setFiltered] = useState<WeatherReport[]>([]);

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
    setCombined([
      ...fav.sort(compareReportAscending),
      ...other.sort(compareReportAscending),
    ]);
  }, [reports]);

  useEffect(() => {
    let reps = combined;
    if (filteredBy === 'favorites') {
      reps = combined.filter((rep) => rep.is_favorite);
    } else if (filteredBy === 'hasNotes') {
      reps = combined.filter((rep) => Object.values(rep.notes).length);
    }
    setFiltered(reps);
  }, [combined, filteredBy]);

  return (
    <>
      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
        <div className="pr-3">Filters:</div>
        <button
          className={`text-white rounded p-2 flex items-center justify-center mr-2 md-mr-3 ${
            filteredBy === 'all' ? 'bg-gray' : 'bg-white text-gray'
          }`}
          onClick={() => setFilteredBy('all')}
        >
          All
        </button>
        <button
          className={`text-white rounded p-2 flex items-center justify-center mr-2 md-mr-3 ${
            filteredBy === 'favorites' ? 'bg-gray' : 'bg-white text-gray'
          }`}
          onClick={() => setFilteredBy('favorites')}
        >
          Favorites
        </button>
        <button
          className={`text-white rounded p-2 flex items-center justify-center mr-2 md-mr-3 ${
            filteredBy === 'hasNotes' ? 'bg-gray' : 'bg-white text-gray'
          }`}
          onClick={() => setFilteredBy('hasNotes')}
        >
          With Notes
        </button>
      </div>
      {filtered.length ? (
        <div className="card my-3">
          <div className="py">
            {filtered.map((report) => (
              <WeatherListCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-2xl flex justify-center items-center h-100">
          {filteredBy === 'favorites'
            ? 'No report has been added to favorites yet'
            : filteredBy === 'hasNotes'
            ? 'No report has notes yet'
            : 'No report found. please use the search field above.'}
        </div>
      )}
    </>
  );
};

export default Cities;
