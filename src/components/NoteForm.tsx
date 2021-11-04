import React, { useState } from 'react';
import TextArea from 'components/TextArea';
import { Note as NoteProps } from 'helpers/weather';
import { useWeather } from 'context/WeatherProvider';
import { ReactComponent as DoneIcon } from 'assets/done.svg';
import { ReactComponent as CancelIcon } from 'assets/cancel.svg';

interface Props {
  note: NoteProps;
  report_id: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const NoteForm: React.FC<Props> = ({ note, report_id, onCancel, onSubmit }) => {
  const [value, setValue] = useState(note.body);
  const [touched, setTouched] = useState(false);

  const { addOrUpdateNote } = useWeather();
  const cancel = () => {
    setValue(note.body);
    setTouched(false);
    onCancel?.();
  };
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
    setTouched(true);
  };

  const save = async () => {
    if (!value) return;
    const data = { ...note, body: value };
    addOrUpdateNote(report_id, data);
    setTouched(false);
    setValue('');
    onSubmit?.();
  };

  return (
    <>
      <TextArea
        className="p-2 rounded-2"
        placeholder="Type your note here"
        value={value}
        onChange={handleChange}
      />
      {touched && (
        <div className="flex justify-end pt-2">
          <button
            className="bg-red text-white rounded-2 ml-2 p-2 flex items-center justify-center"
            onClick={cancel}
          >
            <CancelIcon className="h-2-5 w-2-5" />
          </button>

          <button
            className="text-white bg-blue rounded-2 ml-2 p-2 flex items-center justify-center"
            onClick={save}
          >
            <DoneIcon className="h-2-5 w-2-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default NoteForm;
