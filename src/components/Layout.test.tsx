import { render, screen } from 'test-utils';
import Layout from 'components/Layout';

describe('Layout Component', () => {
  beforeEach(() => {
    render(
      <Layout>
        <div>The body</div>
      </Layout>
    );
  });
  it('renders the header and footer', () => {
    expect(screen.getAllByText('Cities')).toHaveLength(2);
    expect(screen.getByText('WeatherAPI.com')).toBeInTheDocument();
    expect(screen.getByText('The body')).toBeInTheDocument();
  });
});
