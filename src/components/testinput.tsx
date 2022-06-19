
import { useForm, SubmitHandler } from "react-hook-form";




export function TextInput(props) {

   
   

    
    const { register, handleSubmit } = useForm();

    return  (

       <>
       
        
                            
                <input 
                
                    {...register(props.registerName)}
                
                    
                
                />
            
               
       
        </>
    )
}