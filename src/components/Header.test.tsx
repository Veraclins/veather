import { render, screen } from 'test-utils';
import Header from 'components/Header';

describe('Header Component', () => {
  it('renders a header with nav links and search box', () => {
    render(<Header />);
    expect(screen.getAllByText(/Cities/i).length).toEqual(2);
    expect(screen.queryByText(/Current/i)).toBeNull();
    expect(screen.getAllByTestId('search-box').length).toEqual(2);
  });
});
