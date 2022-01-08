import { render } from 'test-utils';
import Current from 'pages/Current';

describe('Current Page', () => {
  it('renders the current page', () => {
    const view = render(<Current />);
    expect(view).toMatchSnapshot();
  });
});
