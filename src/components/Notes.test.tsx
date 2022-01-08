import { render, act, screen } from 'test-utils';
import Notes, { NotesProps } from 'components/Notes';
import { reports } from 'test-data';
import userEvent from '@testing-library/user-event';

describe('Notes Component', () => {
  const props: NotesProps = {
    report: {
      ...reports[0],
      notes: {
        first: { id: 'first', body: 'the first note' },
        second: { id: 'second', body: 'the second note' },
        third: { id: 'third', body: 'the third note' },
        fourth: { id: 'fourth', body: 'the fourth note' },
      },
    },
  };
  it('renders all notes', () => {
    render(<Notes {...props} />);
    const noteTexts = screen.getAllByText(/note/i);
    expect(noteTexts.length).toEqual(4);
  });
  it('edits a note', async () => {
    render(<Notes {...props} />);
    userEvent.click(screen.getAllByTestId('edit-note')[0]);
    const noteText = await screen.findByDisplayValue(/note/i);
    expect(noteText).toBeInTheDocument();
  });
});
