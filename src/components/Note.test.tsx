import { render, screen } from 'test-utils';
import Note, { NoteProps } from 'components/Note';
import userEvent from '@testing-library/user-event';

describe('Note Component', () => {
  const props: NoteProps = {
    report_id: 'hello',
    note: {
      id: 'the-id',
      body: 'the content of the note',
    },
  };
  it('renders a note', () => {
    render(<Note {...props} />);
    const noteText = screen.getByText(props.note.body);
    expect(noteText).toBeInTheDocument();
  });
  it('renders a textarea for editing notes', () => {
    render(<Note {...props} />);
    userEvent.click(screen.getByTestId('edit-note'));

    expect(screen.getByDisplayValue(props.note.body)).toBeInTheDocument();
  });
});
