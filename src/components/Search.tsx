import { useCallback, useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from 'assets/search_black.svg';
import { ReportLocation, search } from 'helpers/weather';
import { debounce } from 'helpers';
import Menu, { MenuItem } from './Menu';
import { useWeather } from 'context/WeatherProvider';

export interface SearchProps {
  name: string;
}

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [searched, setSearched] = useState<ReportLocation[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchNewReport } = useWeather();

  const submit = async (string: string) => {
    const locations = await search(string);
    if (locations?.length) {
      setSearched(locations);
      setMenuOpen(true);
    }
  };

  const fetchReport = async (location: ReportLocation) => {
    setLoading(true);
    await fetchNewReport({ name: location.name, is_favorite: true });
    setLoading(false);
    setMenuOpen(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMenuOpen(false);
    setValue(e.target.value);
    setTouched(true);
  };

  const handleSearch = useCallback(debounce(submit), []);

  useEffect(() => {
    if (touched && value.length > 2) {
      handleSearch(value);
    }
  }, [handleSearch, value, touched]);

  return (
    <div className="flex search-container relative">
      <SearchIcon />
      <input onChange={handleChange} value={value} placeholder="Search city" />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)}>
        {loading ? (
          <MenuItem>Please wait while we load your data</MenuItem>
        ) : (
          <>
            {searched.map((location, index) => (
              <MenuItem
                onClick={() => fetchReport(location)}
                key={`${index}-${location.lat}-${location.lon}`}
              >
                {location.name}
              </MenuItem>
            ))}
          </>
        )}
      </Menu>
    </div>
  );
};

export default Search;
