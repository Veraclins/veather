import { reports } from 'test-data';
import * as weatherApi from 'helpers/weather';

describe('Weather helper function', () => {
  let mockFetch: jest.SpyInstance<
    Promise<Partial<Response>>,
    [input: RequestInfo, init?: RequestInit | undefined]
  >;
  const report = { ...reports[0] };
  const response = {
    current: report.data,
    location: report.location,
  };

  beforeEach(() => {
    mockFetch = jest.spyOn(window, 'fetch');
  });
  it('gets a report by name', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => response,
    });

    const mockGetReport = jest.spyOn(weatherApi, 'getReport');

    const data = await weatherApi.getReport({ name: 'The name' });
    expect(mockGetReport).toHaveBeenCalled();
    expect(data).toHaveProperty('current');
    expect(data).toHaveProperty('location');
  });
  it('gets a report by longitude and latitude', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => response,
    });

    const mockGetReport = jest.spyOn(weatherApi, 'getReport');

    const data = await weatherApi.getReport({ long: 7.46, lat: 9.1 });
    expect(mockGetReport).toHaveBeenCalled();
    expect(data).toHaveProperty('current');
    expect(data).toHaveProperty('location');
  });
  it('searches a city by name', async () => {
    const value = 'London';

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [
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
      ],
    });

    const mockSearchCity = jest.spyOn(weatherApi, 'search');

    const data = await weatherApi.search(value);
    expect(mockSearchCity).toHaveBeenCalled();
    expect(data).toHaveLength(2);
  });
});
