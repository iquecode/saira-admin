import { Eye, IconProps } from "phosphor-react";
import { createElement, useEffect, useState } from "react";
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

    

    const iconJSX = icon ? createElement(icon, {className:'mr-1 dark:peer-focus:text-saira-yellow peer-focus:text-brandBlue-500', size:24, weight:'bold'}) : null;
    const classLabelAside = labelAside ? 'flex' : '';
    //const { register, handleSubmit } = useForm();
    const { register, formState:{errors} } = useFormContext(); // retrieve all hook methods
    const [typeInput, setTypeInput] = useState<string>(type);


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
                            text-xl
                            
                            w-full
                            h-12`}
            >

                {type !== 'password' ? null :
                      <div className="w-full flex justify-end -ml-9">
                      {/* <Eye className={`cursor-pointer mr-1 dark:peer-focus:text-saira-yellow peer-focus:text-brandBlue-500`} weight="bold" size={24} />  */}
                      {type==='password' ? <Eye onClick={() => typeInput==='password' ? setTypeInput('text') : setTypeInput('password')   } className={`cursor-pointer ${typeInput==='text' ? 'opacity-100' : 'opacity-40'} mr-1 dark:peer-focus:text-saira-yellow peer-focus:text-brandBlue-500`} weight="bold" size={24} /> : null}
                  </div>
                }
              
              
                { typeInput === 'date' ?
                     <input 
                     {...register(registerName)}
                     type={typeInput === 'date' ? 'text' : typeInput} 
                     onFocus={(e)=>(e.target.type='date')} 
                     onBlur={(e)=>(e.target.type='text')}
                     placeholder={placeholder} 
                     className={`
                         peer bg-none bg-transparent focus:outline-none pl-3 w-full
                     `}
                     required={required}
                     value={value}
                     onChange={e => valueChanged?.(e.target.value)}
                 />
                 :
                 <input 
                 {...register(registerName)}
                 type={typeInput === 'date' ? 'text' : typeInput} 
                 placeholder={placeholder} 
                 className={`
                     peer bg-none bg-transparent focus:outline-none pl-3 w-full
                 `}
                 required={required}
                 value={value}
                 onChange={e => valueChanged?.(e.target.value)}
             />




                }           
               


                {!iconJSX ? null :
                     <div className="w=full">
                     {iconJSX}
                     </div>

                }
                
               
            </div>    
            {!errors? null : errors[registerName]?.type && <InputError type={errors[registerName].type} field={registerName} />}
        </label>
       
       
       
        </>
    )
}