import React from 'react';
import TextArea from 'components/TextArea';
import { WeatherReport } from 'helpers/weather';
import Note from 'components/Note';
import NoteForm from 'components/NoteForm';

interface Props {
  report: WeatherReport;
}

const Notes: React.FC<Props> = ({ report }) => {
  return (
    <>
      <div className="w-100 p-2">
        <NoteForm note={{ body: '' }} report_id={report.id as string} />
      </div>
      <div className="w-100 p-2 notes-container">
        {report.notes?.map((note) => (
          <Note note={note} report_id={report.id as string} key={note.id} />
        ))}
      </div>
    </>
  );
};

export default Notes;
