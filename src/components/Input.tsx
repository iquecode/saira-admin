
import { IconProps } from "phosphor-react";
import { createElement } from "react";


interface InputProps {
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> ;
    placeholder?: string
    type?: HTMLInputElement["type"]
}



export function Input({icon, placeholder, type = 'text'} : InputProps) {

   
    //console.log(icon);

    

    const iconJSX = createElement(icon, {className:'mr-1 peer-focus:text-saira-yellow', size:20, weight:'bold'});

    return (
        <div className={`flex 
                        flex-row-reverse 
                        justify-end 
                        dark:bg-zinc-900 
                        dark:text-zinc-300
                        bg-zinc-100  
                        focus-within:border-2 
                        focus-within:border-saira-yellow
                        rounded-md p-2
                        mt-2`}
         >
                               
            <input 
                className="peer bg-none bg-transparent focus:outline-none" 
                type={type} 
                placeholder={placeholder} 
            />
           
            {iconJSX}
            
            
        </div>    
    )
}