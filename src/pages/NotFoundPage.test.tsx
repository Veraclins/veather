import { render } from 'test-utils';
import NotFoundPage from 'pages/NotFoundPage';

describe('NotFoundPage Page', () => {
  it('renders the not found page', () => {
    const view = render(<NotFoundPage />);
    expect(view).toMatchSnapshot();
  });
});
