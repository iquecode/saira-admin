import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { forwardRef, useImperativeHandle, useState } from 'react';


export default function Form({ children, className, onSubmit, reset}) {
  const methods = useForm();
  //const [resetForm, setResetForm] = useState<boolean>(false);

  //resetForm = reset;
   

  //const onSubmit = data => console.log(data);
  return (
    
   <FormProvider {...methods} > 
  
      
      <form onSubmit={methods.handleSubmit(onSubmit)}  className={className}>
        {children}
      </form>
    </FormProvider>
  )
}



