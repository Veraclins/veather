import React from 'react';
import { WeatherReport } from 'helpers/Store';
import Note from 'components/Note';
import NoteForm from 'components/NoteForm';

export interface NotesProps {
  report: WeatherReport;
}

const Notes: React.FC<NotesProps> = ({ report }) => {
  return (
    <>
      <div className="w-100 p-2">
        <NoteForm note={{ body: '', id: '' }} report_id={report.id as string} />
      </div>
      <div className="w-100 p-2 notes-container">
        {Object.values(report.notes).map((note) => (
          <Note note={note} report_id={report.id as string} key={note.id} />
        ))}
      </div>
    </>
  );
};

export default Notes;
