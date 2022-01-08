import React, { useState } from 'react';
import NoteForm from 'components/NoteForm';
import { Note as MainProps } from 'helpers/Store';
import { useWeatherContext } from 'context/WeatherContext';
import { ReactComponent as DeleteIcon } from 'assets/delete_forever.svg';
import { ReactComponent as EditIcon } from 'assets/edit.svg';

export interface NoteProps {
  note: MainProps;
  report_id: string;
}

const Note: React.FC<NoteProps> = ({ note, report_id }) => {
  const [editing, setEditing] = useState(false);

  const { deleteNote } = useWeatherContext();

  const remove = () => {
    deleteNote(report_id, note.id);
  };

  return editing ? (
    <div className="py-2">
      <NoteForm
        note={note}
        report_id={report_id}
        onCancel={() => setEditing(false)}
        onSubmit={() => setEditing(false)}
      />
    </div>
  ) : (
    <div className="w-100 py-2">
      <div className="text-normal">{note.body}</div>
      <div className="flex justify-end pt-2">
        <button
          className="text-white bg-blue rounded-1 py-1 px-2 flex items-center justify-center text-sm"
          onClick={() => setEditing(true)}
          data-testid="edit-note"
        >
          <EditIcon className="h-2-5 w-2-5" />
        </button>
        <button
          className="bg-red text-white rounded-1 ml-2 py-1 px-2 flex items-center justify-center text-sm"
          onClick={remove}
          data-testid="delete-note"
        >
          <DeleteIcon className="h-2-5 w-2-5" />
        </button>
      </div>
    </div>
  );
};

export default Note;
