import { LockSimple } from "phosphor-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UserNormalized } from "../../../../model/User"
import { api, apiSSR } from "../../../../services/api"
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
        stateId: number,
    }
    type TypeState = {
        id: number,
        name: string,
        uf: string,
    }

    const [countries, setCountries] = useState<TypeCountry[] | null>(null);
    const [countryIdSelected, setCountryIdSelected] = useState<number | null>(33);

    const [cities, setCities] = useState<TypeCity[]  | null>(null);
    const [states, setStates] = useState<TypeState[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string| null>(null);



    const { register, handleSubmit, setValue } = useForm();

    function handleStateChange(uf:string, city?:string) {
        api.get('model/city/get-cities', { 
            params: {uf}
        })
        .then(response => {
            console.log(cities);
            setCities(response.data);
            if(city) {
                setValue('cityId', city);
            }
        })
        .catch(error=>{
            setErrorMessage(error.message);
        });
    }


    function  handleCepChange(cep:string) {
        apiSSR.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            console.log(response.data);
            setValue('stateId', response.data.uf);
            handleStateChange(response.data.uf, response.data.ibge);
            //pegar uf da city e setar no select do estado
            //



        })
        .catch(error=>{
            setErrorMessage(error.message);
        });
    }


    useEffect( () => {
        api.get('model/country/get-countries', {
        })
        .then(response => {
            setCountries(response.data);
        })
        .catch(error=>{
            setErrorMessage(error.message);
        });

        api.get('model/state/get-states', {
        })
        .then(response => {
            let statesFromDB = response.data;
            function compare(a:TypeState,b:TypeState) {
                if (a.name < b.name)
                   return -1;
                if (a.name > b.name)
                  return 1;
                return 0;
              }
            statesFromDB.sort(compare);
            setStates(statesFromDB);
        })
        .catch(error=>{
            setErrorMessage(error.message);
        });

      }, []);


      useEffect( () => {
        

      }, []);

    
    
    console.log(countries);
   
    return (

    <>
        <p className="text-brandBlue-500 font-bold p-4">3. Cadastro para submeter o pedido de associação.</p>


      
        <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
          
        <div className="mt-6">
            <p className="text-xl font-semibold mb-8">Quase acabando :) . Agora só falta preencher e enviar os dados abaixo:
            </p>

            {/* {countries ? countries.map((country) => <p key={country.id}>{country.id}</p> ) : null} */}
            
            <form className="flex flex-col">
               
             
                
                <label>País
                    <select {...register('countryId', {
                            onChange: (e) => { setCountryIdSelected(e.target.value)
                                               if(e.target.value != 33){
                                                   setValue('stateId',null);
                                                   setValue('cityId', null);
                                               } 
                            },
                        })}
                        id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {!countries ? null : countries.map(function(country) {
                            return <option selected={country.id==33} value={country.id}>{country.namePt}</option>
                        })}
                    </select>
                </label>


             
                <label className="mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cep
                    <input {...register('cep', {
                            onBlur: (e) => { handleCepChange(e.target.value)},
                        })} 
                    type="text" id="cep" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </label>


                



                <label className={`${countryIdSelected==33 ? null : 'hidden'}`}>Estado
                    <select {...register('stateId', {
                            onChange: (e) => { handleStateChange(e.target.value)},
                        })}
                        id="states" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {!states ? null : states.map(function(state) {
                            return <option value={state.uf}>{state.name}</option>
                        })}
                    </select>
                </label>


                <label className={`${countryIdSelected==33 ? null : 'hidden'}`}>Cidade
                    <select {...register('cityId', {
                            // onChange: (e) => { setCountryIdSelected(e.target.value)},
                        })}
                        id="cities" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {!cities ? null : cities.map(function(city) {
                            return <option value={city.id}>{city.name}-{city.id}</option>
                        })}
                    </select>
                </label>


              


                


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

