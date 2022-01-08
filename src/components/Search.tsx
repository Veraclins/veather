import { useCallback, useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from 'assets/search_black.svg';
import { ReportLocation } from 'helpers/Store';
import { search } from 'helpers/weather';
import { debounce } from 'helpers';
import Menu, { MenuItem } from './Menu';
import { useWeatherContext } from 'context/WeatherContext';
import { useHistory } from 'react-router';

interface SearchProps {
  className?: string;
  onLoaded?: () => void;
}

interface Location {
  name: string;
  region?: string;
  country: string;
  isCustom?: boolean;
}

const getLocationName = (location: Location) => {
  const region = (
    location.region
      ? `${location.region}, ${location.country}`
      : location.country
  ).trim();
  return `${location.name}${region ? ', ' + region : ''}`;
};
export const Search: React.FC<SearchProps> = ({ className, onLoaded }) => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [searched, setSearched] = useState<Location[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchNewReport } = useWeatherContext();

  const submit = async (string: string) => {
    setLoading(true);
    setMenuOpen(true);
    const locations = await search(string);
    if (locations?.length) {
      setSearched(locations);
    } else {
      setSearched([
        { name: 'No matching city found', country: '', isCustom: true },
      ]);
    }
    setLoading(false);
  };

  const fetchReport = async (location: Location) => {
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
    setValue(e.target.value.trim());
    setTouched(true);
  };

  const handleSearch = useCallback(debounce(submit), []);

  useEffect(() => {
    if (touched && value.length > 2) {
      handleSearch(value);
    }
  }, [handleSearch, value, touched]);

  return (
    <div className={`flex ${className ? className : ''}`}>
      <div
        className={`flex search-container relative w-100`}
        data-testid="search-box"
      >
        <SearchIcon />
        <input
          onChange={handleChange}
          value={value}
          placeholder="Search city"
        />
        <Menu open={menuOpen} onClose={() => setMenuOpen(false)}>
          {loading ? (
            <MenuItem>Please wait...</MenuItem>
          ) : (
            <>
              {searched.map((location, index) => (
                <MenuItem
                  onClick={() => fetchReport(location)}
                  key={`${index}-${location.name}-${location.country}`}
                  className={location.isCustom ? 'pointer-events-none' : ''}
                >
                  {getLocationName(location)}
                </MenuItem>
              ))}
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default Search;
