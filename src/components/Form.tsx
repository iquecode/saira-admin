import { useForm, FormProvider, useFormContext } from "react-hook-form";

export default function Form({ children, className, onSubmit}) {
  const methods = useForm();
  //const onSubmit = data => console.log(data);
  return (
    <FormProvider {...methods} > 
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  )
}
