import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UserNormalized } from "../../../../model/User"
import { api, apiSSR } from "../../../../services/api"
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputError } from "../../../InputErros"
import useAppData from '../../../../data/hook/useAppData'
import useAuth from "../../../../data/hook/useAuth";
import resetPassword from "../../../../pages/api/auth/reset-password";
import { populateFormWithDataUser } from "./helper";



type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
    setOrderAssociateStatus: Dispatch<SetStateAction<string>>
  }

export default function Step3({user, setCurrentStep, setOrderAssociateStatus}:AssocieteProps) {
    const {  getAuthenticatedUser } = useAuth();
    
    const { setLoading} = useAppData();

    //const [formData, setFormData] = useState(null);
    
    
    const [countries, setCountries] = useState<TypeCountry[] | null>(null);
    const [countryIdSelected, setCountryIdSelected] = useState<number | null>(33);

    const schema = yup.object({
            name: yup.string().minWords(2).required(),
            socialName: yup.string(), 
            nickname: yup.string(),
            birthDate:yup.date().required(),
            occupation: yup.string().required(),
            motherName: yup.string().required(),
            fatherName: yup.string(),
            cpf: yup.string().required(),
            documentTypeId: yup.string().required(),
            documentNumber: yup.string().required(),
            countryId: yup.string().required(),
            cep: countryIdSelected == 33 ? yup.string().required() : yup.string(),
            stateId: countryIdSelected == 33 ? yup.string().required() : yup.mixed(),
            cityId: countryIdSelected == 33 ? yup.number().required() : yup.mixed(),
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
   
    const resolver = {resolver:yupResolver<yup.AnyObjectSchema>(schema)};
    //const methods = useForm(resolver);
    const { register, reset, handleSubmit, setValue, formState:{errors} } = useForm(resolver);

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

    

    const [cities, setCities] = useState<TypeCity[]  | null>(null);
    const [states, setStates] = useState<TypeState[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string| null>(null);

    const [typesDocuments, setTypesDocuments] = useState<TypeDocument[] | null>(null);

    

    //const onSubmit: SubmitHandler<IForm> = data => console.log(data);

    // Enviar os dados para o backend - api routes
    // no backend tratar e gravar os dados
    // gravar um pedido de associação - requerimento
    // retornar para a tela onde 
    const onSubmit = async (data: any) => {
        try {
        setLoading(true);
        const response = await api.post('model/user-orders/new-associate-order', {
            data,
        });
        if (response.data.orderAssociate) {
            alert("Eba, deu certo. Seu pedido de associação foi enviado com sucesso ao Círculo Gestor. O tratamento do pedido será comunicado por email e na plataforma");
            console.log('aqui... front pegou response');
            console.log(response.data.orderAssociate);

            //const updatedUser = await getAuthenticatedUser();
            setOrderAssociateStatus('created');
            
            //console.log('####updated user:');
            //console.log(updatedUser.data.user);
            setLoading(false);
            setCurrentStep(4);
           
            // setar usuário com o pedido de associação. 
            //ir à página 0
        } else {
            setLoading(false);
            alert("Ops. Ocorreu um erro no processamento. Tente reenviar");
        }
        } catch(error) {
            setLoading(false);
            alert("Ops. Ocorreu um erro: " + error.message);
        }
      };

    function onError(error:any) {
        console.log(error);
        console.log('++++++++');
        console.log(errors);
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
        })
        .catch(error=>{
            setErrorMessage(error.message);
        });
    }


    useEffect( () => {

        reset(populateFormWithDataUser(user));
       
        api.get('model/country/get-countries', {
        })
        .then(response => {
            setCountries(response.data);
            setValue('countryId', 33);
           









            
         
           
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
            
           
            setValue('stateId', user.city.state.uf);
            handleStateChange(user.city.state.uf, user.cityId as unknown as string)
            //setValue('cityId', user.cityId);
            
        })
        .catch(error=>{
            setErrorMessage(error.message);
        });


        setTypesDocuments([
            {id:1, name:'Carteira de Identidade'},
            {id:2, name:'CNH'},
            {id:3, name:'Passaporte'},
        ]);
        setValue('documentTypeId', '1');

        //reset(user);
        //console.log('populate');
        //console.log(user);
        //console.log(populateFormWithDataUser(user));
        //reset(populateFormWithDataUser(user));
        //setValue('stateId', 'RS');


      }, []);



    
   
    return (

    <>
    <p className="text-brandBlue-500 font-bold p-4">3. Cadastro para submeter o pedido de associação.</p>
    <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
        
        <div className="mt-6">
            <p className="text-lg font-semibold mb-8">Quase acabando :) . Agora só falta preencher e enviar os dados abaixo, 
                para finalizar seu pedido de associação ao instituto. 
            </p>
            <p className="text-base"> 
                Dados com * são obrigatórios - é necessário um pouco de burocracia para garantir que tudo esteja juridicamente bem na sua associação.
            </p>

        

            {/* {countries ? countries.map((country) => <p key={country.id}>{country.id}</p> ) : null} */}
            
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col">



            <div className="border-dotted border-2 p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold">Dados de identificação*</p>


                <label className="label-input-form">Nome completo*
                    <input {...register('name')} 
                    type="text" id="name" className="input-form" placeholder='conforme seu documento' />
                    <InputError type={errors?.name?.type? errors['name'].type : null} field={'name'} />
                </label>
                {/* {!errors? null : errors['name']?.type && <InputError type={errors['name'].type} field={'name'} />} */}
                
                
                <label className="label-input-form">Nome social
                    <input {...register('socialName')} 
                    type="text" id="socialName" className="input-form" placeholder='se for o caso' />
                    <InputError type={errors?.socialName?.type? errors['socialName'].type : null} field={'socialName'} />
                </label>

                <label className="label-input-form">Como quer ser chamad@?
                    <input {...register('nickname')} 
                    type="text" id="nickname" className="input-form" placeholder='primeiro nome ou algum apelido carinhoiso? :)' />
                <InputError type={errors?.nickname?.type? errors['nickName'].type : null} field={'nickName'} />
                </label>

                <label className="label-input-form">Profissão / ocupação*
                    <input {...register('occupation')} 
                    type="text" id="occupation" className="input-form" />
                    <InputError type={errors?.occupation?.type? errors['occupation'].type : null} field={'occupation'} />
                </label>
                
                <label className="label-input-form">Data de nascimento*
                    <input {...register('birthDate')} 
                    type="date" id="birthDate" className="input-form" />
                    <InputError type={errors?.birthDate?.type? errors['birthDate'].type : null} field={'birthDate'} />
                </label>
            
                <label className="label-input-form">Nome da mãe*
                    <input {...register('motherName')} 
                    type="text" id="motherName" className="input-form" />
                    <InputError type={errors?.motherName?.type? errors['motherName'].type : null} field={'motherName'} />
                </label>
                
                <label className="label-input-form">Nome do pai
                    <input {...register('fatherName')} 
                    type="text" id="fatherName" className="input-form" />
                    <InputError type={errors?.fatherName?.type? errors['fatherName'].type : null} field={'fatherName'} />
                </label>
                

                <label className="label-input-form">CPF*
                    <InputMask mask="999.999.999-99" {...register('cpf')} 
                    type="text" id="cpf" className="input-form"  placeholder='caso seja estrangeir@ e não possua, complete com zeros' />
                    <InputError type={errors?.cpf?.type? errors['cpf'].type : null} field={'cpf'} />
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
                    <InputError type={errors?.documentTypeId?.type? errors['documentTypeId'].type : null} field={'documentTypeId'} />
                </label>
                
            
                <label className="label-input-form">Nº do documento*
                    <input {...register('documentNumber')} 
                    type="text" id="documentNumber" className="input-form"  placeholder='documento que você enviou no passo anterior' />
                    <InputError type={errors?.documentNumber?.type? errors['documentNumber'].type : null} field={'documentNumber'} />
                </label>           
                </div>

    
                <div className="border-dotted border-2 p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
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
                        <InputError type={errors?.countryId?.type? errors['countryId'].type : null} field={'countryId'} />
                    </label>
                    
                    <label className={`${countryIdSelected==33 ? null : 'hidden'} label-input-form`}>Cep*
                        <InputMask mask="99999-999" value={user.cep} {...register('cep', {
                                onBlur: (e) => { handleCepChange(e.target.value)},
                            })} 
                        type="text" id="cep" className="input-form" placeholder="Informe o cep para localização automática" />
                        <InputError type={errors?.cep?.type? errors['cep'].type : null} field={'cep'} />
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
                        <InputError type={errors?.stateId?.type? errors['stateId'].type : null} field={'stateId'} />
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
                        <InputError type={errors?.cityId?.type? errors['cityId'].type : null} field={'cityId'} />
                    </label>
                    
                    <label className="label-input-form">Endereço - Linha 1*
                        <input {...register('addressLine1')} 
                        type="text" id="addressLine1" className="input-form" />
                        <InputError type={errors?.addressLine1?.type? errors['addressLine1'].type : null} field={'addressLine1'} />
                    </label>
                    
                    <label className="label-input-form">Endereço - Linha 2
                        <input {...register('addressLine2')} 
                        type="text" id="addressLine2" className="input-form"  placeholder='complemento...' />
                        <InputError type={errors?.addressLine2?.type? errors['addressLine2'].type : null} field={'addressLine2'} />
                    </label>
                </div>
                
                <div className="border-dotted border-2 p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold"><span className="text-brandBlue-500">Informações Opcionais:</span> se quiser informe outros dados de contato e/ou uma biografia de apresenação : )</p>
                    <label className="label-input-form">Email Alternativo
                        <input {...register('alternativeEmail')} 
                        type="text" id="alternativeEmail" className="input-form" placeholder='email diferente do usado na conta' />
                        <InputError type={errors?.alternativeEmail?.type? errors['alternativeEmail'].type : null} field={'alternativeEmail'} />
                    </label>
                    
                
                    <label className="label-input-form">Telegram
                        <input {...register('telegram')} 
                        type="text" id="telegram" className="input-form" />
                        <InputError type={errors?.telegram?.type? errors['telegram'].type : null} field={'telegram'} />
                    </label>
                
                    <label className="label-input-form">WhatsApp
                        <input {...register('whatsapp')} 
                        type="text" id="whatsapp" className="input-form" />
                        <InputError type={errors?.whatsapp?.type? errors['whatsapp'].type : null} field={'whatsapp'} />
                    </label>
                    
                    <label className="label-input-form">Facebook
                        <input {...register('facebook')} 
                        type="text" id="facebook" className="input-form" />
                        <InputError type={errors?.facebook?.type? errors['facebook'].type : null} field={'facebook'} />
                    </label>
                    
                    <label className="label-input-form">Instagram
                        <input {...register('instagram')} 
                        type="text" id="instagram" className="input-form" />
                        <InputError type={errors?.instagram?.type? errors['instagram'].type : null} field={'instagram'} />
                    </label>
                    
                    <label className="label-input-form">Github
                        <input {...register('github')} 
                        type="text" id="github" className="input-form" />
                        <InputError type={errors?.github?.type? errors['github'].type : null} field={'github'} />
                    </label>
                    
                    <label className="label-input-form">Linkedin
                        <input {...register('linkedin')} 
                        type="text" id='linkedin' className="input-form" />
                        <InputError type={errors?.linkedin?.type? errors['linkedin'].type : null} field={'linkedin'} />
                    </label>
                    
                    <label className="label-input-form">Biografia pública (se você quiser, pode escrever uma bio para se apresentar aos membros e usuários da plataforma).
                        <textarea {...register('bio')} 
                        id='bio' className="text-area-form" />
                        <InputError type={errors?.bio?.type? errors['bio'].type : null} field={'bio'} />
                    </label>  
                </div>

                <div className="mt-6 w-full flex justify-center">
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
                            ENVIAR O PEDIDO DE ASSOCIAÇÃO
                    </button>
                </div>
            </form>
        </div>
            
    </div>
    </>  
    )
}
