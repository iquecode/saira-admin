
import { IconProps } from "phosphor-react";
import { createElement, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import { InputError } from "./InputErros";

interface InputProps {
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> ;
    placeholder?: string
    type?: HTMLInputElement["type"]
    //type?: string
    hidden?: boolean
    label?: string
    value?: any
    required?: boolean
    notShowWhen?: boolean
    labelAside?: boolean
    registerName?: string
    valueChanged?: (newValue: any) => void
}



export function Input({icon, placeholder, type = 'text', label, value, required, notShowWhen, valueChanged, labelAside, registerName, hidden = false } : InputProps) {

   
    //console.log(icon);

    

    const iconJSX = createElement(icon, {className:'mr-1 dark:peer-focus:text-saira-yellow peer-focus:text-brandBlue-500', size:24, weight:'bold'});
    const classLabelAside = labelAside ? 'flex' : '';
    //const { register, handleSubmit } = useForm();
    const { register, formState:{errors} } = useFormContext(); // retrieve all hook methods


    // useEffect(() => {
    //     errors[registerName]? alert(errors[registerName]?.message) : null;
        
    // }, [errors]);

    return notShowWhen ? null : hidden ? 
    <input 
                
                    {...register(registerName)}
                    type='hidden' 
                    value={value}
                /> :
    
(

       <>
       
        <label 
            className={`w-full 
                        ${classLabelAside}
                        dark:text-zinc-300 
                        text-zinc-700
                        text-xl
                        mb-4
                        
                        `}
        > 
            {label} 
       
            <div className={`flex 
                            flex-row-reverse 
                            justify-end
                            items-center
                            dark:bg-zinc-900 
                            bg-zinc-100
                            dark:text-zinc-300 
                            text-zinc-400
                            focus-within:border-2 
                            dark:focus-within:border-saira-yellow
                            focus-within:border-brandBlue-500
                            rounded-md p-2
                            
                            w-full
                            h-12`}
            >
                            
                <input 
                
                    {...register(registerName)}
                    type={type} 
                    placeholder={placeholder} 
                    className={`
                        peer bg-none bg-transparent focus:outline-none pl-3
                    `}
                    required={required}
                    value={value}
                    onChange={e => valueChanged?.(e.target.value)}
                    
                
                />
            
               
                {iconJSX}
            </div>    
            {!errors? null : errors[registerName]?.type && <InputError type={errors[registerName].type} field={registerName} />}
        </label>
       
       
       
        </>
    )
}