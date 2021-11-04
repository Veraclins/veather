import React from 'react';
import { ReactComponent as Logo } from 'assets/veather-logo.svg';
import { NavLink } from 'react-router-dom';
import Search from 'components/Search';
import { useWeather } from 'context/WeatherProvider';
import MobileNav from 'components/MobileNav';

const Header: React.FC = () => {
  const { current } = useWeather();
  return (
    <header>
      <nav className="layout flex justify-between items-center relative">
        <NavLink to="/">
          <Logo className="logo" />
        </NavLink>
        <MobileNav />
        <div className="justify-end items-center none md-flex">
          <Search className="min-w-16x lg-min-w-20x mr-4" />
          <NavLink to={`/cities`} className="text-lg text-white">
            Cities
          </NavLink>
          {current ? (
            <NavLink to={'/cities/current'} className="text-lg text-white ml-4">
              Current
            </NavLink>
          ) : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
