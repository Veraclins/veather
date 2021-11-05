import { act, fireEvent, render, screen, waitFor } from 'test-utils';
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
  const newNote = 'A new note that will be saved';
  const report = { ...reports[0] };
  const cached = [report];

  beforeEach(() => {
    render(<App cached={cached} />);

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
  });
  it('loads reports for default cities', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });
    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    mockGetReport.mockResolvedValueOnce(report);

    await waitFor(() => screen.getByText(report.location.name));

    expect(screen.getByText(report.location.name)).toBeInTheDocument();
  });

  it('loads reports for searches', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });
    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    const mockSearch = jest.spyOn(weatherApi, 'search');
    mockGetReport.mockResolvedValueOnce(report);
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

    act(() => {
      fireEvent.change(screen.getAllByPlaceholderText('Search city')[0], {
        target: { value },
      });
    });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledTimes(1);
    });

    userEvent.click(screen.getByText(value));

    await screen.findByText(report.location.name);

    expect(
      screen.getByText(report.current.pressure_mb + ' mb', { exact: true })
    ).toBeInTheDocument();
  });
  it('adds report to favorite', async () => {
    const mockUpdateReport = jest.spyOn(weatherApi, 'updateOrAdd');
    mockUpdateReport.mockReturnValueOnce([report]);

    userEvent.click(screen.getByTestId('logo'));

    await waitFor(() => {
      screen.getByText(report.location.name);
    });

    const favorites = screen.getAllByTestId('favorite-report');

    act(() => {
      userEvent.click(favorites[favorites.length - 1]);
    });

    await waitFor(() => {
      expect(mockUpdateReport).toHaveBeenCalled();
    });
  });
  it('deletes a report', async () => {
    const mockUpdateReport = jest.spyOn(weatherApi, 'updateOrAdd');
    mockUpdateReport.mockReturnValueOnce([]);

    userEvent.click(screen.getByTestId('logo'));

    await waitFor(() => {
      screen.getByText(report.location.name);
    });

    userEvent.click(screen.getAllByTestId('delete-report')[0]);

    await waitFor(() => {
      expect(screen.queryByText(report.location.name)).not.toBeInTheDocument();
    });
  });
  it('update notes', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });
    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    mockGetReport.mockResolvedValueOnce(report);

    await waitFor(() => {
      screen.getByText(report.location.name);
    });

    userEvent.click(screen.getByText(report.location.name));
    const existingNote = report.notes[0].body;
    await waitFor(() => {
      screen.getByText(existingNote);
    });

    userEvent.click(screen.getByTestId('edit-note'));
    const input = screen.getByDisplayValue(existingNote);
    userEvent.clear(input);

    userEvent.type(input, 'note body updated');

    userEvent.click(screen.getByTestId('save-note'));

    await waitFor(() => {
      expect(screen.getByText('note body updated')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(existingNote)).not.toBeInTheDocument();
    });
  });
  it('add notes', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });
    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    mockGetReport.mockResolvedValueOnce(report);

    await waitFor(() => {
      screen.getByText(report.location.name);
    });

    userEvent.click(screen.getByText(report.location.name));

    await waitFor(() => {
      screen.getByPlaceholderText('Type your note here');
    });

    userEvent.type(screen.getByPlaceholderText('Type your note here'), newNote);

    userEvent.click(screen.getByTestId('save-note'));

    await waitFor(() => {
      expect(screen.getByText(newNote)).toBeInTheDocument();
    });
  });
  it('deletes notes', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => report,
    });
    const mockGetReport = jest.spyOn(weatherApi, 'getReport');
    mockGetReport.mockResolvedValueOnce(report);

    await waitFor(() => {
      screen.getByText(report.location.name);
    });

    userEvent.click(screen.getByText(report.location.name));
    await waitFor(() => {
      screen.getByText(newNote);
    });

    userEvent.click(screen.getAllByTestId('delete-note')[1]);

    await waitFor(() => {
      expect(screen.queryByText(newNote)).not.toBeInTheDocument();
    });
  });
});
