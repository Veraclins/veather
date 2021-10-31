import React from 'react';
import { ReactComponent as Logo } from 'assets/veather-logo.svg';
import { NavLink } from 'react-router-dom';
import Search from 'components/Search';
interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header className="">
        <nav className="layout flex justify-between items-center">
          <NavLink to="/">
            <Logo className="logo" />
          </NavLink>
          <Search />
        </nav>
      </header>
      <main className="layout">{children}</main>
      <footer className="layout flex justify-center items-center">
        Powered by{' '}
        <a
          href="https://www.weatherapi.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Free Weather API"
        >
          WeatherAPI.com
        </a>
      </footer>
    </>
  );
};

export default Layout;
