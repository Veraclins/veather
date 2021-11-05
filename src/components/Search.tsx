import { useCallback, useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from 'assets/search_black.svg';
import { ReportLocation, search } from 'helpers/weather';
import { debounce } from 'helpers';
import Menu, { MenuItem } from './Menu';
import { useWeatherContext } from 'context/WeatherContext';
import { useHistory } from 'react-router';

interface SearchProps {
  className?: string;
  onLoaded?: () => void;
}

export const Search: React.FC<SearchProps> = ({ className, onLoaded }) => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [searched, setSearched] = useState<ReportLocation[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchNewReport } = useWeatherContext();

  const submit = async (string: string) => {
    const locations = await search(string);
    if (locations?.length) {
      setSearched(locations);
      setMenuOpen(true);
    }
  };

  const fetchReport = async (location: ReportLocation) => {
    setLoading(true);
    const report = await fetchNewReport({ name: location.name });
    setLoading(false);
    setMenuOpen(false);
    history.push(`/cities/${report?.id}`);
    setValue('');
    onLoaded?.();
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
    <div
      className={`flex search-container relative ${className ? className : ''}`}
      data-testid="search-box"
    >
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
