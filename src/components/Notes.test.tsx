import { render, act } from 'test-utils';
import Notes, { NotesProps } from 'components/Notes';
import { reports } from 'test-data';
import userEvent from '@testing-library/user-event';

describe('Notes Component', () => {
  const props: NotesProps = {
    report: {
      ...reports[0],
      notes: [
        { id: 'first', body: 'the first note' },
        { id: 'second', body: 'the second note' },
        { id: 'third', body: 'the third note' },
        { id: 'fourth', body: 'the fourth note' },
      ],
    },
  };
  it('renders all notes', () => {
    const component = render(<Notes {...props} />);
    const noteTexts = component.getAllByText(/note/i);
    expect(noteTexts.length).toEqual(4);
  });
  it('edits a note', async () => {
    const component = render(<Notes {...props} />);
    act(() => {
      userEvent.click(component.getAllByTestId('edit-note')[0]);
    });
    const noteText = await component.findByDisplayValue(/note/i);
    expect(noteText).toBeInTheDocument();
  });
});
