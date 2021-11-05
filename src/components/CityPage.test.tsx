import { render, screen } from 'test-utils';
import CityPage from 'components/CityPage';
import { reports } from 'test-data';

describe('CityPage Component', () => {
  const report = reports[0];
  it('renders full details of a report', () => {
    render(<CityPage report={report} />);
    expect(screen.getByText(report.location.name)).toBeInTheDocument();
    expect(
      screen.getByText(report.location.country, { exact: false })
    ).toBeInTheDocument();
  });
  it('renders a text area for new notes', () => {
    render(<CityPage report={report} />);

    expect(
      screen.getByPlaceholderText('Type your note here')
    ).toBeInTheDocument();
  });
});
