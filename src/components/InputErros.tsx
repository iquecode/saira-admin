import errors from '../util/errors.json';

interface InputErrorProps {
  type: any;
  field: string;
}

export function InputError({ type, field }: InputErrorProps) {
  
  return <div className="text-brandPink-500 text-sm">{errors[field][type]}</div>;
}