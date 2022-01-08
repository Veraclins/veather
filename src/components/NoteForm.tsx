import React, { useEffect, useState } from 'react';
import TextArea from 'components/TextArea';
import { Note as NoteProps } from 'helpers/Store';
import { useWeatherContext } from 'context/WeatherContext';
import { ReactComponent as DoneIcon } from 'assets/done.svg';
import { ReactComponent as CancelIcon } from 'assets/cancel.svg';

export interface NoteFormProps {
  note: NoteProps;
  report_id: string;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  note,
  report_id,
  onCancel,
  onSubmit,
}) => {
  const [value, setValue] = useState(note.body);
  const [touched, setTouched] = useState(false);

  const { addOrUpdateNote } = useWeatherContext();
  const cancel = () => {
    setValue('');
    setTouched(false);
    onCancel?.();
  };
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  const save = async () => {
    if (!value) return;
    const data = { ...note, body: value };
    addOrUpdateNote(report_id, data);
    setValue('');
    onSubmit?.();
  };

  useEffect(() => {
    setTouched(value.trim() !== '');
  }, [value]);

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
            data-testid="cancel-edit"
          >
            <CancelIcon className="h-2-5 w-2-5" />
          </button>

          <button
            className="text-white bg-blue rounded-2 ml-2 p-2 flex items-center justify-center"
            onClick={save}
            data-testid="save-note"
          >
            <DoneIcon className="h-2-5 w-2-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default NoteForm;
