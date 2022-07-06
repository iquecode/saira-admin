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

    const { register } = useFormContext(); // retrieve all hook methods

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

            <Form className="flex flex-col">
               
                <Input 
                    placeholder='conforme seu documento'
                    type='text'
                    registerName='name'
                    label='Nome Completo*'
                />
                <Input 
                    placeholder='se for o caso' 
                    type='text'
                    registerName='socialName'
                    label='Nome social'
                />
                <Input 
                    type='text'
                    registerName='nickname'
                    label='como quer ser chamad@?'
                />
                <Input 
                    type='text'
                    registerName='occupation'
                    label='Profissão / ocupação'
                />
                <Input 
                    type='date'
                    registerName='birthDay'
                    label='Data nascimento'
                />
                <Input 
                    type='text'
                    registerName='motherName'
                    label='Nome da mãe'
                />
                <Input 
                    type='text'
                    registerName='fatherName'
                    label='Nome do pai'
                />
                <Input 
                    placeholder='caso seja estrangeir@ e não possua, deixe em branco' 
                    type='text'
                    registerName='cpf'
                    label='CPF'
                />
                <Input 
                    placeholder='Tipo do documento identificação' 
                    type='check-box'
                    registerName='documentTypeId'
                    label='Tipo do documento'
                />
                <Input 
                    placeholder='Nº do documento identificação' 
                    type='check-box'
                    registerName='documentNumber'
                    label='Nº do documento'
                />
                
                
                <p>Endereço</p>
                <select
                    {...register('countyId', {
                        onChange: (e) => {},
                    })}
                />
                <Input 
                    type='text'
                    registerName='cep'
                    label='Cep'
                />
                <Input 
                    type='text'
                    registerName='uf'
                    label='UF'
                />
                <Input 
                    type='text'
                    registerName='city'
                    label='Cidade'
                />
                <Input  
                    type='text'
                    registerName='addressLine1'
                    label='Endereço - linha1'
                />
                 <Input 
                    type='text'
                    registerName='addressLine2'
                    label='Endereço - linha2'
                />
                

            </Form>
            
        

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

