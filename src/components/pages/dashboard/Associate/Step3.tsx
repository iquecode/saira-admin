import { LockSimple } from "phosphor-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UserNormalized } from "../../../../model/User"
import { api } from "../../../../services/api"
import Form from "../../../Form"
import { Input } from "../../../Input"
import { useForm, Controller, useFormContext } from "react-hook-form";



type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
  }
export default function Step2({user, setCurrentStep}:AssocieteProps) {

    

    type TypeCountry = {
        id: number,
        namePt: string,
    }
    type TypeCity = {
        id: number,
        name: string,
    }
    type TypeState = {
        id: number,
        name: string,
    }

    const [countries, setCountries] = useState<TypeCountry[] | null>(null);
    const [cities, setCities] = useState<TypeCity[]  | null>(null);
    const [states, setStates] = useState<TypeState[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string| null>(null);



    const { register, handleSubmit } = useForm();


    useEffect( () => {
        // api.get('model/contry/get-countries', {
        // })
        // .then(response => {
        //     setCountries(response.data.countries);
        // })
        // .catch(error=>{
        //     setErrorMessage(error.message);
        // });

        // api.get('model/state/get-states', {
        // })
        // .then(response => {
        //     setStates(response.data.states);
        // })
        // .catch(error=>{
        //     setErrorMessage(error.message);
        // });

      }, []);


      useEffect( () => {
        

      }, []);

    
    

   
    return (

    <>
        <p className="text-brandBlue-500 font-bold p-4">3. Cadastro para submeter o pedido de associação.</p>


      
        <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
          
        <div className="mt-6">
            <p className="text-xl font-semibold mb-8">Quase acabando :) . Agora só falta preencher e enviar os dados abaixo:
            </p>

            <form className="flex flex-col">
               
             
                
                
                <p>Endereço</p>
                <select {...register('stateId', {
                        onChange: (e) => { console.log(e.target.value)},
                    })}
                    id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Escolha um estado</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                </select>

                <div>
                    <p>Mostra a mudança dinamica... repopular select das cidades</p>
                </div>
               
                
              
               

            </form>
            
        

        </div>
            
            <p className="mt-8 mb-8 font-semibold">Vamos continuar? : )</p>
            
            <div className="flex w-full justify-center">
                <button className="bg-brandBlue-500 
                                    p-3 hover:brightness-110 
                                    duration-200 
                                    rounded-sm 
                                    w-full 
                                    md:w-1/2 
                                    text-white 
                                    font-bold"
                                    
                        onClick={()=>setCurrentStep(3)}
                >
                        ENVIAR DADOS - IR AO PASSO 3
                </button>
            </div>
        </div>

        <div>
            <img src={user.documentPhotoURL1} />
        </div>
       
    </>  
    )
          
}

