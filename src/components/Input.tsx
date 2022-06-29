
import { IconProps } from "phosphor-react";
import { createElement } from "react";
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";

interface InputProps {
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> ;
    placeholder?: string
    type?: HTMLInputElement["type"]
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
    const { register } = useFormContext(); // retrieve all hook methods

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
                            mb-3
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
        </label>
       
        </>
    )
}