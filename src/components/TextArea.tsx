import { useEffect, useState } from 'react';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<TextAreaProps> = ({ onChange, ...props }) => {
  const [value, setValue] = useState(props.value);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return <textarea {...props} value={value} onChange={handleChange} rows={5} />;
};

export default TextArea;
