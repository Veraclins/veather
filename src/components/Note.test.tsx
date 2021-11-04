import React from 'react';
import { render, screen } from 'test-utils';
import Note, { NoteProps } from 'components/Note';

test('renders learn react link', () => {
  const props: NoteProps = {
    report_id: 'hello',
    note: {
      id: 'the-id',
      body: 'the content of the note',
    },
  };
  render(<Note {...props} />);
  const noteText = screen.getByText(/the content of the note/i);
  expect(noteText).toBeInTheDocument();
});
