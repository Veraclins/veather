import { render, screen } from 'test-utils';
import WeatherListCard from 'components/WeatherListCard';
import { reports } from 'test-data';

describe('WeatherListCard Component', () => {
  it('renders some details of the report', () => {
    const report = reports[0];
    render(<WeatherListCard report={report} />);

    expect(screen.getByText(report.location.name)).toBeInTheDocument();
    expect(
      screen.getByText(report.data.temp_c, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(report.data.temp_f, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(report.data.condition.text)).toBeInTheDocument();
  });
});
