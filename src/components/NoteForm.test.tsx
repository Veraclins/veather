import { render, screen } from 'test-utils';
import NoteForm from 'components/NoteForm';
import userEvent from '@testing-library/user-event';

describe('NoteForm Component', () => {
  it('renders an empty textarea', () => {
    render(<NoteForm report_id="hello" note={{ body: '', id: '' }} />);
    expect(
      screen.getByPlaceholderText('Type your note here')
    ).toBeInTheDocument();
  });
  it('clears the textarea when user clicks cancel', async () => {
    render(<NoteForm report_id="hello" note={{ body: '', id: '' }} />);

    userEvent.type(
      screen.getByPlaceholderText('Type your note here'),
      'A new note'
    );

    userEvent.click(screen.getByTestId('cancel-edit'));

    expect(
      await screen.findByPlaceholderText('Type your note here')
    ).toHaveValue('');
  });
  it('saves the note and clears the form', async () => {
    render(<NoteForm report_id="hello" note={{ body: '', id: '' }} />);

    userEvent.type(
      screen.getByPlaceholderText('Type your note here'),
      'A new note that will be saved'
    );

    userEvent.click(screen.getByTestId('save-note'));

    expect(
      await screen.findByPlaceholderText('Type your note here')
    ).toHaveValue('');
  });
});
