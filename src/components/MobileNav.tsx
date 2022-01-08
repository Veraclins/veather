import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Search from 'components/Search';
import { WeatherReport } from 'helpers/Store';

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
          <Search className=" w-100 border-1 mx-2" onLoaded={toggleMenu} />
        </div>
        <NavLink
          onClick={toggleMenu}
          to="/cities"
          className="p-3 rounded-2"
          activeClassName="border-1 m-2"
          exact
        >
          Cities
        </NavLink>
        {current ? (
          <NavLink
            onClick={toggleMenu}
            to="/cities/current"
            className="p-3 rounded-2"
            activeClassName="border-1 m-2"
            exact
          >
            Current
          </NavLink>
        ) : null}
      </menu>
    </section>
  );
};

export default MobileNav;
