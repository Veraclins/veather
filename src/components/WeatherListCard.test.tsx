import { render, screen } from 'test-utils';
import WeatherListCard from 'components/WeatherListCard';
import { reports } from 'test-data';

describe('WeatherListCard Component', () => {
  const report = reports[0];

  beforeEach(() => {
    render(<WeatherListCard report={report} />);
  });
  it('renders some details of the report', () => {
    expect(screen.getByText(report.location.name)).toBeInTheDocument();
    expect(
      screen.getByText(report.current.temp_c, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(report.current.temp_f, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(report.current.condition.text)).toBeInTheDocument();
  });
});
