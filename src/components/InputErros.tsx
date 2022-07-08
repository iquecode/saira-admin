import errors from '../util/errors.json';

interface InputErrorProps {
  type: any;
  field: string;
}

export function InputError({ type, field }: InputErrorProps) {
  
  if(!type) return null;
  if(!errors[field]?.[type]) {
    return <div className="text-brandPink-500 text-sm">{errors['standardTypes']?.[type] ? errors['standardTypes'][type] : 'Erro no preenchimento - verifique' }</div>;
  }
  return <div className="text-brandPink-500 text-sm">{errors[field][type]}</div>;
}