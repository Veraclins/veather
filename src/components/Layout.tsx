import React from 'react';
import Header from 'components/Header';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="layout flex-1 mb-4">{children}</main>
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
