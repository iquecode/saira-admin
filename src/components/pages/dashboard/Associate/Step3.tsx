import { LockSimple, YoutubeLogo } from "phosphor-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UserNormalized } from "../../../../model/User"
import { api, apiSSR } from "../../../../services/api"
import Form from "../../../Form"
import { Input } from "../../../Input"
import { useForm, Controller, useFormContext, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"



type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
  }
export default function Step3({user, setCurrentStep}:AssocieteProps) {
    
    const [mode, setMode] = useState<'bra' | 'ext'  >('bra');

    const emailRules    =    yup.string().email().required();
    const passwordRules = yup.string().min(8).max(60).minLowercase(1).minUppercase(1).minNumbers(1).minRepeating(2).required();
    //const passworConfirmdRules = yup.string().oneOf([yup.ref('password')], 'As senhas não conferem').required();

    interface IForm {
        name: string,
        socialName: string, 
        nickname: string,
        birthDay:string,
        occupation: string,
        motherName: string,
        fatherName: string,
        cpf: string,
        documentTypeId: string,
        documentNumber: string,
        countryId: number,
        cep: string,
        stateId: number,
        cityId: number,
        addressLine1: string,
        addressLine2: string,
        alternativeEmail:  string,
        telegram: string,
        whatsapp: string,
        facebook: string,
        instagram: string,
        github: string,
        linkedin: string,
        bio: string
    }

   

    const schema = yup.object({
            name: yup.string().minWords(2).required(),
            socialName: yup.string(), 
            nickname: yup.string(),
            birthDay:yup.date().required(),
            occupation: yup.string().required(),
            motherName: yup.string().required(),
            fatherName: yup.string(),
            cpf: yup.number().required(),
            documentTypeId: yup.string().required(),
            documentNumber: yup.string().required(),
            countryId: yup.number().required(),
            cep: yup.number().required(),
            stateId: yup.string().required(),
            cityId: yup.number().required(),
            addressLine1: yup.string().required(),
            addressLine2: yup.string(),
            alternativeEmail:  yup.string().email(),
            telegram: yup.string(),
            whatsapp: yup.string(),
            facebook: yup.string(),
            instagram: yup.string(),
            github: yup.string(),
            linkedin: yup.string(),
            bio: yup.string()
        });
   




    const resolver = {resolver:yupResolver(schema)};
    const methods = useForm(resolver);


    

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

    type TypeDocument = {
        id: number,
        name: string,
    }

    const [countries, setCountries] = useState<TypeCountry[] | null>(null);
    const [countryIdSelected, setCountryIdSelected] = useState<number | null>(33);

    const [cities, setCities] = useState<TypeCity[]  | null>(null);
    const [states, setStates] = useState<TypeState[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string| null>(null);

    const [typesDocuments, setTypesDocuments] = useState<TypeDocument[] | null>(null);

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<IForm> = data => console.log(data);
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    // const onSubmit = async data => {
    //     await sleep(2000);
    //     //if (data.username === "bill") {
    //       alert(JSON.stringify(data));
    //     //} else {
    //       //alert("There is an error");
    //     //}
    //   };

    function onError(error:any) {
        console.log(error);
    }

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
            setValue('addressLine1', response.data.logradouro);
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


        setTypesDocuments([
            {id:1, name:'Carteira de Identidade'},
            {id:2, name:'CNH'},
            {id:3, name:'Passaporte'},
        ])



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
            
            <form onSubmit={methods.handleSubmit(onSubmit, onError)} className="flex flex-col">



            <div className="border-dotted border-2 p-3 border-gray-700 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold">Dados de identificação*</p>


                <label className="label-input-form">Nome completo*
                    <input {...register('name')} 
                    type="text" id="name" className="input-form" placeholder='conforme seu documento' />
                </label>

                <label className="label-input-form">Nome social
                    <input {...register('socialName')} 
                    type="text" id="socialName" className="input-form" placeholder='se for o caso' />
                </label>

                <label className="label-input-form">Como quer ser chamad@?
                    <input {...register('nickname')} 
                    type="text" id="nickname" className="input-form" placeholder='se for o caso' />
                </label>

                <label className="label-input-form">Profissão / ocupação*
                    <input {...register('occupation')} 
                    type="text" id="occupation" className="input-form" />
                </label>

                <label className="label-input-form">Data de nascimento*
                    <input {...register('birthDay')} 
                    type="date" id="birthDay" className="input-form" />
                </label>

                <label className="label-input-form">Nome da mãe*
                    <input {...register('motherName')} 
                    type="text" id="motherName" className="input-form" />
                </label>

                <label className="label-input-form">Nome do pai
                    <input {...register('fatherName')} 
                    type="text" id="fatherName" className="input-form" />
                </label>

                <label className="label-input-form">CPF*
                    <InputMask mask="999.999.999-99" {...register('cpf')} 
                    type="text" id="cpf" className="input-form"  placeholder='caso seja estrangeir@ e não possua, complete com zeros' />
                </label>

                <label className="label-input-form">Tipo do documento*
                      <select {...register('documentTypeId')}
                            id="documentTypeId" className="input-form">
                            {!typesDocuments ? null : typesDocuments.map(function(typeDocument) {
                                return <option value={typeDocument.id}>{typeDocument.name}</option>
                            })}
                        </select>
                    {/* <input {...register('documentTypeId')} 
                    type="text" id="documentTypeId" className="input-form"  placeholder='documento que você enviou no passo anterior' /> */}
                </label>
              
                       
              

                <label className="label-input-form">Nº do documento*
                    <input {...register('documentNumber')} 
                    type="text" id="documentTypeId" className="input-form"  placeholder='documento que você enviou no passo anterior' />
                </label>
                </div>

            
                <div className="border-dotted border-2 p-3 border-gray-700 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold">Onde você mora?*</p>
                    <label className="label-input-form">País*
                        <select {...register('countryId', {
                                onChange: (e) => { setCountryIdSelected(e.target.value)
                                                if(e.target.value != 33){
                                                    setValue('stateId',null);
                                                    setValue('cityId', null);
                                                } 
                                },
                            })}
                            id="countries" className="input-form">
                            {!countries ? null : countries.map(function(country) {
                                return <option selected={country.id==33} value={country.id}>{country.namePt}</option>
                            })}
                        </select>
                    </label>

                    <label className="label-input-form">Cep*
                        <InputMask mask="99999-999" {...register('cep', {
                                onBlur: (e) => { handleCepChange(e.target.value)},
                            })} 
                        type="text" id="cep" className="input-form" placeholder="Informe o cep para localização automática" />
                    </label>

                    <label className={`${countryIdSelected==33 ? null : 'hidden'} label-input-form`}>Estado*
                        <select {...register('stateId', {
                                onChange: (e) => { handleStateChange(e.target.value)},
                            })}
                            id="states" className="input-form">
                            {!states ? null : states.map(function(state) {
                                return <option value={state.uf}>{state.name}</option>
                            })}
                        </select>
                    </label>

                    <label className={`${countryIdSelected==33 ? null : 'hidden'} label-input-form`}>Cidade*
                        <select {...register('cityId', {
                                // onChange: (e) => { setCountryIdSelected(e.target.value)},
                            })}
                            id="cities" className="input-form">
                            {!cities ? null : cities.map(function(city) {
                                return <option value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </label>

                    <label className="label-input-form">Endereço - Linha 1*
                        <input {...register('addressLine1')} 
                        type="text" id="addressLine1" className="input-form" />
                    </label>

                    

                    <label className="label-input-form">Endereço - Linha 2
                        <input {...register('addressLine2')} 
                        type="text" id="addressLine2" className="input-form"  placeholder='complemento...' />
                    </label>
                </div>
                



                <div className="border-dotted border-2 p-3 border-gray-700 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold"><span className="text-brandBlue-500">Informações Opcionais:</span> se quiser informe outros dados de contato e/ou uma biografia de apresenação : )</p>
                    <label className="label-input-form">Email Alternativo
                        <input {...register('alternativeEmail')} 
                        type="text" id="alternativeEmail" className="input-form" placeholder='email diferente do usado na conta' />
                    </label>
                    <label className="label-input-form">Telegram
                        <input {...register('telegram')} 
                        type="text" id="telegram" className="input-form" />
                    </label>
                    <label className="label-input-form">WhatsApp
                        <input {...register('whatsapp')} 
                        type="text" id="whatsapp" className="input-form" />
                    </label>
                    <label className="label-input-form">Facebook
                        <input {...register('facebook')} 
                        type="text" id="facebook" className="input-form" />
                    </label>
                    <label className="label-input-form">Instagram
                        <input {...register('instagram')} 
                        type="text" id="instagram" className="input-form" />
                    </label>
                    <label className="label-input-form">Github
                        <input {...register('github')} 
                        type="text" id="github" className="input-form" />
                    </label>
                    <label className="label-input-form">Linkedin
                        <input {...register('linkedin')} 
                        type="text" id='linkedin' className="input-form" />
                    </label>

                    <label className="label-input-form">Biografia pública (se você quiser, pode escrever uma bio para se apresentar aos membros e usuários da plataforma).
                        <textarea {...register('bio')} 
                        id='bio' className="text-area-form" />
                    </label>
                </div>
                <button className="bg-brandBlue-500 
                                    p-3 hover:brightness-110 
                                    duration-200 
                                    rounded-sm 
                                    w-full 
                                    md:w-1/2 
                                    text-white 
                                    font-bold"
                                    type="submit"
                        // onClick={()=>setCurrentStep(3)}
                >
                        ENVIAR DADOS - IR AO PASSO 3
                </button>
                
                
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
                                    type="submit"
                        // onClick={()=>setCurrentStep(3)}
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

