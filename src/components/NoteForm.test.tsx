import { render, screen, waitFor } from 'test-utils';
import NoteForm from 'components/NoteForm';
import userEvent from '@testing-library/user-event';

describe('NoteForm Component', () => {
  it('renders an empty textarea', () => {
    render(<NoteForm report_id="hello" note={{ body: '' }} />);
    expect(
      screen.getByPlaceholderText('Type your note here')
    ).toBeInTheDocument();
  });
  it('clears the textarea when user clicks cancel', () => {
    render(<NoteForm report_id="hello" note={{ body: '' }} />);

    userEvent.type(
      screen.getByPlaceholderText('Type your note here'),
      'A new note'
    );

    userEvent.click(screen.getByTestId('cancel-edit'));

    waitFor(() => {
      expect(screen.getByPlaceholderText('Type your note here')).toHaveValue(
        ''
      );
    });
  });
  it('saves the note and clears the form', () => {
    render(<NoteForm report_id="hello" note={{ body: '' }} />);

    userEvent.type(
      screen.getByPlaceholderText('Type your note here'),
      'A new note that will be saved'
    );

    userEvent.click(screen.getByTestId('save-note'));

    waitFor(() => {
      expect(screen.getByPlaceholderText('Type your note here')).toHaveValue(
        ''
      );
    });
  });
});
