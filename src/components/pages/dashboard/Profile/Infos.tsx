import { useEffect, useState } from "react"
import { UserNormalized } from "../../../../model/User"
import { api } from "../../../../services/api"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { InputError } from "../../../InputErros"
import useAppData from '../../../../data/hook/useAppData'
import useAuth from "../../../../data/hook/useAuth";
import { getDataDBtoForm, populateFormInfoProfileWithDB } from "../Associate/helper";


export default function Infos() {
    const {  getAuthenticatedUser } = useAuth();
    const { setLoading} = useAppData();
    const [countries, setCountries] = useState<TypeCountry[] | null>(null);
    const [countryIdSelected, setCountryIdSelected] = useState<number | null>(33);
    const  { user }  = useAuth();
    


    const schema = yup.object({
            name: yup.string().nullable(),
            socialName: yup.string().nullable(), 
            nickname: yup.string().nullable(),
            
            occupation: yup.string().nullable(),
            countryId: yup.string().nullable(),
            stateId: countryIdSelected == 33 ? yup.string().nullable() : yup.mixed().nullable(),
            cityId: countryIdSelected == 33 ? yup.number().nullable() : yup.mixed().nullable(),
            bio: yup.string().nullable()
        });
   
    const resolver = {resolver:yupResolver<yup.AnyObjectSchema>(schema)};
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

    const [cities, setCities] = useState<TypeCity[]  | null>(null);
    const [states, setStates] = useState<TypeState[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string| null>(null);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response = await api.post('model/user/update', {
                data,
            });
            if (response.data.userUpdate) {
                const upDateAuth = await getAuthenticatedUser();
                console.log('@@@aqui');
                //console.log(upDateAuth.data.user);
                //setUserUpdate(upDateAuth.data.user);
                
                //reset(populateFormInfoProfileWithDB(userUpdate.data.user));
                alert("Tudo certo, perfil atualizado. : )");
                console.log('aqui... front pegou response');
                console.log(response.data.userUpdate);
                setLoading(false);
            } else {
                setLoading(false);
                console.log(response);
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
            console.log(error);
        });
    }

    useEffect( () => {
        getDataDBtoForm()
        .then( data => {
            setCountries(data.countries);
            const states = [{id:null, name: 'Selecione...', uf: null}, ...data.states]
            setStates(states);
            

            reset(populateFormInfoProfileWithDB(user));
            if(user.city) {
                handleStateChange(user.city?.state.uf, user.cityId as unknown as string);
            }
            if(!user.countryId) setValue('countryId', 33);
            if(!user.documentTypeId)  setValue('documentTypeId', '1');
            setValue('bio', user.bio);
            console.log('aqui', user.bio);
        })
        .catch( error =>
            alert("asda " + error.message)    
        )
      }, [,user]);


    return (
    <>
    
    <div className="mt-6 p-1 sm:p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
        
        <div>
            
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col">
            <p className="text-brandBlue-500 font-bold text-center sm:text-left">Informe o que desejar para o seu perfil</p>

            <div className="border-dotted border-2 p-1 sm:p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
                {/* <p className="text-base text-zinc-400 font-semibold">Informe as infos que quiser :)</p> */}
               

                <label className="label-input-form">Nome completo
                    <input {...register('name')} 
                    readOnly={user.associated}
                    type="text" id="name" className={`input-form ${user.associated ? 'cursor-not-allowed' : null}`} placeholder='conforme seu documento' />
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

                <label className="label-input-form">Profissão / ocupação
                    <input {...register('occupation')} 
                    type="text" id="occupation" className="input-form" />
                    <InputError type={errors?.occupation?.type? errors['occupation'].type : null} field={'occupation'} />
                </label>
                
                <label className="label-input-form">Data de nascimento
                    <input {...register('birthDate')} 
                    readOnly={user.associated}
                    type="date" id="birthDate" className={`input-form ${user.associated ? 'cursor-not-allowed' : null}`} />
                    <InputError type={errors?.birthDate?.type? errors['birthDate'].type : null} field={'birthDate'} />
                </label>
            
                <div className="border-dotted border-2 p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold">Onde você mora?</p>
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
                    
                </div>
                
                <div className="border-dotted border-2 p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
                    <p className="text-base text-zinc-400 font-semibold">Biografia pública</p>
                    <label className="label-input-form">Se você quiser, pode escrever uma bio para se apresentar aos membros e usuários da plataforma.
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
                            ATUALIZAR PERFIL
                    </button>
                </div>
                </div>
            </form>
        </div>
            
    </div>
    </>  
    )
}
