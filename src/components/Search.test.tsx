import { render, screen, waitFor, fireEvent, act } from 'test-utils';
import Search from 'components/Search';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
  let mockFetch: jest.SpyInstance<
    Promise<Partial<Response>>,
    [input: RequestInfo, init?: RequestInit | undefined]
  >;

  beforeEach(() => {
    render(<Search />);

    mockFetch = jest.spyOn(window, 'fetch');
  });

  it('renders an empty input', () => {
    expect(screen.getByPlaceholderText('Search city')).toBeInTheDocument();
  });
  it('searches when you type a search string', async () => {
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
        },
        {
          name: `${value}2`,
          region: `${value}2-region`,
          country: `${value}2-country`,
          lat: 38.69,
          lon: 40.69,
        },
      ],
    });

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Search city'), {
        target: { value },
      });
    });

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    const results = await screen.findByText('London');
    expect(results).toBeInTheDocument();
  });
  it('fetches report when you click a location and clear the search', async () => {
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
        },
        {
          name: `${value}2`,
          region: `${value}2-region`,
          country: `${value}2-country`,
          lat: 38.69,
          lon: 40.69,
        },
      ],
    });

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Search city'), {
        target: { value },
      });
    });

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    userEvent.click(screen.getByText('London'));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search city')).toHaveValue('');
    });
  });
});
