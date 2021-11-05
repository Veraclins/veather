import { render } from 'test-utils';
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
    const component = render(<Note {...props} />);
    const noteText = component.getByText(props.note.body);
    expect(noteText).toBeInTheDocument();
  });
  it('renders a textarea for editing notes', () => {
    const component = render(<Note {...props} />);
    userEvent.click(component.getByTestId('edit-note'));

    expect(component.getByDisplayValue(props.note.body)).toBeInTheDocument();
  });
});
