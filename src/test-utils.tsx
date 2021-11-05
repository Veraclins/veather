import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WeatherContext from 'context/WeatherContext';

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <WeatherContext.Provider
        value={{
          others: [],
          reports: [],
          favorites: [],
          deleteNote: jest.fn(),
          removeReport: jest.fn(),
          updateCurrent: jest.fn(),
          toggleFavorite: jest.fn(),
          fetchNewReport: jest.fn(),
          addOrUpdateNote: jest.fn(),
        }}
      >
        {children}
      </WeatherContext.Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
