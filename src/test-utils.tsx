import { render, RenderOptions } from '@testing-library/react';

import WeatherProvider from 'context/WeatherProvider';

const AllTheProviders: React.FC = ({ children }) => {
  return <WeatherProvider>{children}</WeatherProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
