import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Search from 'components/Search';
import { WeatherReport } from 'helpers/weather';

interface Props {
  current?: WeatherReport;
}

export const MobileNav: React.FC<Props> = ({ current }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <section
      onClick={toggleMenu}
      className={`cursor-pointer w-5 h-4 flex md-none justify-center items-center5${
        isActive ? ' active' : ''
      }`}
    >
      <button
        className="flex flex-column justify-center bg-transparent w-100 h-100"
        data-testid="open-mobile-menu"
      >
        <span className="hamburger" />
        <span className="hamburger" />
        <span className="hamburger" />
      </button>
      <menu className="flex flex-column md-none mobile-menu">
        <div
          className="w-100"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Search
            className="min-w-16x border-1 border-light-gray mx-2"
            onLoaded={toggleMenu}
          />
        </div>
        <NavLink
          onClick={toggleMenu}
          to="/cities"
          className="p-3 rounded w-100"
        >
          Cities
        </NavLink>
        {current ? (
          <NavLink
            onClick={toggleMenu}
            to="/cities/current"
            className="p-3 rounded w-100"
          >
            Current
          </NavLink>
        ) : null}
      </menu>
    </section>
  );
};

export default MobileNav;
