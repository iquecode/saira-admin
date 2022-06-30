import { useForm, FormProvider, useFormContext, SubmitHandler } from "react-hook-form";
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface FormProps {
  children: any;
  className?: string
  onSubmit?: SubmitHandler<any>
  toggleReset?: boolean
  resetOnSubmit?: boolean
  schema?: yup.AnyObjectSchema
}

export default function Form({ children, className, onSubmit, toggleReset, resetOnSubmit, schema}:FormProps) {
  
  const resolver = schema ? {resolver:yupResolver(schema) } : null;
  const methods = useForm(resolver);

  

  //resetForm = reset;
  
   
  // useEffect(() => {
    
  //     methods.reset();
    
  // }, [toggleReset]);

  useEffect(() => {
    if(resetOnSubmit) {
      if (methods.formState.isSubmitSuccessful) {
        methods.reset();
      }
    }
  }, [methods.formState, methods.reset]);


  function onError(error:any) {
    console.log(error);
  }
  //const onSubmit = data => console.log(data);
  return (
    
   <FormProvider {...methods} > 
  
      
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}  className={className}>
        {children}
      </form>
    </FormProvider>
  )
}


