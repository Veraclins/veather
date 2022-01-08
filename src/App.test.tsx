import { fireEvent, render, screen, waitFor } from 'test-utils';
import App from 'App';
import { reports } from 'test-data';
import * as weatherApi from 'helpers/weather';
import userEvent from '@testing-library/user-event';
import { storage } from 'helpers/storage';

describe('App Component', () => {
  let mockFetch: jest.SpyInstance<
    Promise<Partial<Response>>,
    [input: RequestInfo, init?: RequestInit | undefined]
  >;

  const report = { ...reports[0] };
  const response = {
    id: report.id,
    current: report.data,
    location: report.location,
  };
  const cached = [report];

  beforeEach(() => {
    mockFetch = jest.spyOn(window, 'fetch');
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0,
    };
    global.localStorage = localStorageMock;
    storage.clear();
  });

  it('loads reports for default cities', async () => {
    render(<App cached={cached} />);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });

    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    mockGetReport.mockResolvedValueOnce(response);

    expect(await screen.findByText(report.location.name)).toBeInTheDocument();
  });

  it('loads reports for searches', async () => {
    render(<App cached={cached} />);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });

    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    const mockSearch = jest.spyOn(weatherApi, 'search');
    mockGetReport.mockResolvedValueOnce(response);
    const value = 'London';

    mockSearch.mockResolvedValueOnce([
      {
        name: `${value}`,
        region: `${value}-region`,
        country: `${value}-country`,
        lat: 35.69,
        lon: 139.69,
        tz_id: 'Asia/Shanghai',
        localtime_epoch: 1636026967,
        localtime: '2021-11-04 19:56',
      },
      {
        name: `${value}2`,
        region: `${value}2-region`,
        country: `${value}2-country`,
        lat: 38.69,
        lon: 40.69,
        tz_id: 'Asia/Shanghai',
        localtime_epoch: 1636026967,
        localtime: '2021-11-04 19:56',
      },
    ]);

    fireEvent.change(screen.getAllByPlaceholderText('Search city')[0], {
      target: { value },
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    userEvent.click(screen.getByText(value));

    expect(
      await screen.findByText(report.data.pressure_mb + ' mb', {
        exact: true,
      })
    ).toBeInTheDocument();
    expect(mockGetReport).toHaveBeenCalled();
  });
});
