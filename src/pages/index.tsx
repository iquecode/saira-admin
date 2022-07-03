import { EnvelopeSimple, LockSimple, TrademarkRegistered } from 'phosphor-react';
import { useState, useContext, useEffect } from 'react';
import { Input } from '../components/Input';
import BotaoAlternarTema from '../components/template/BotaoAlternarTema';
import useAppData from '../data/hook/useAppData';
import Form from '../components/Form';
import { SubmitHandler,  useFormContext } from "react-hook-form"; //necessário apenas para a tipagem
import route from "next/router";
import useAuth from '../data/hook/useAuth';
import * as yup from "yup";
import YupPassword from 'yup-password'
import Loading from '../components/Loading';
YupPassword(yup) // extend yup



interface IFormInput  {
    email: string,
    password: string,
    passwordConfirm: string,
  };

export default function Auth(props) {

    const ip = props.ip;
    const { tema, alternarTema, menuIndex} = useAppData()
    const [mode, setMode] = useState<'login' | 'signup' | 'reset' >('login');
    const [loading, setLoading] = useState<boolean>(true);
    const [msgError, setMsgError] = useState<string | null>(null);
    
   
    const { signIn, signUp, getAuthenticatedUser, sendLinkResetPassword, isAuthenticated } = useAuth();



    const emailRules    =    yup.string().email().required();
    const passwordRules = yup.string().min(8).max(60).minLowercase(1).minUppercase(1).minNumbers(1).minRepeating(2).required();
    //const passworConfirmdRules = yup.string().oneOf([yup.ref('password')], 'As senhas não conferem').required();

    let schema = yup.object({email: emailRules});
    if(mode === 'signup' ) {
        schema = yup.object({
            email: emailRules,
            password:  passwordRules,
            passwordConfirm: yup.string().oneOf([yup.ref('password')], 'As senhas não conferem').required(),
        });
    }
    if(mode === 'login' ) {
        schema = yup.object({
            email: emailRules,
            password:  passwordRules,
        });
    }
    
    
    //const onSubmit: SubmitHandler<IFormInput> = async data => await signIn(data); //debug
   
    const onSubmit: SubmitHandler<IFormInput> = async function(data) {
        if (mode==='signup') return await signUp(data);
        if (mode==='login')  return await signIn(data);
        if (mode==='reset')  return await sendLinkResetPassword(data);
    } 
    // usar getAuthenticatedUser na renderização do lado so servidor ou do lado do cliente
    // para, no caso de existir usuário autenticado de forma válida, ir para a dashboard
    //const onSubmit: SubmitHandler<IFormInput> = async data => await getAuthenticatedUser(); 

    useEffect( () => {

        // if (isAuthenticated) {
        //   let page = localStorage.getItem('page');
        //   if(!page) page = ('/dashboard');
        //   route.push(page);
        // } else {

            setMsgError(localStorage.getItem('msgErrorLoading'));

            getAuthenticatedUser().then(r => {
                if(!!r.data.user) {
                    let page = localStorage.getItem('page');
                    localStorage.removeItem('msgErrorLoading');
                    if(!page) page = ('/dashboard');
                    //setLoading(false);
                    route.push(page);
                } else {
                    localStorage.removeItem('msgErrorLoading');
                    setLoading(false);
                  //route.push('/');
                }
                
              })
              .catch((error) => {
                localStorage.setItem('msgErrorLoading', 'Erro de comunicação com o servidor... recarregando...');
                // setMsgError('Erro de comunicação com o servidor... recarregando...')
                route.push('/');
              })





        // }

       






        }, [])



    
    return (


        <div className={`${tema} min-h-screen`}>

            {loading ? <Loading msg={msgError} />
            
            :


            <div className='min-h-screen flex flex-col dark:bg-zinc-900 bg-zinc-300'>
                
                <div className='w-full h-40 flex justify-center items-center dark:bg-zinc-800 bg-zinc-100'>
                    <div className='w-full flex items-center justify-center sm:justify-between sm:w-[30rem]'>
                        <img className='mb-4 h-32' src="/images/logo.png" alt="Instituto Saíra" />
                        <BotaoAlternarTema tema={tema} alternarTema={alternarTema} hideInSmall/>
                    </div>
                </div>
                
                <div className='flex flex-col items-center justify-center p-2 sm:mt-24 mt-16 sm:flex-none h-full'>
                    <p className='dark:text-zinc-300 
                                  text-zinc-700 
                                  font-semibold 
                                  text-4xl 
                                  mb-3'
                    >
                        {mode === 'login' ? 'Entre com a sua conta' : mode==='signup' ? 'Crie sua conta' : 'Redefinição de senha'}
                    </p>
                    {mode === 'reset' ? 
                        
                        <p className='dark:text-zinc-300 
                                      text-zinc-700 
                                      font-semibold 
                                      text-lg
                                      mb-3
                                      mt-7
                                      max-w-4xl
                                      text-center'
                        >
                             Informe seu email e clique no botão para receber uma mensagem com o link para redefinir sua senha.
                        </p>
                       
                        
                        : ''}
                   
                    <div className='dark:bg-zinc-800 bg-zinc-200 w-full p-2 sm:p-10 rounded-sm sm:w-[30rem]'>
                        <Form className='flex flex-col items-center' onSubmit={onSubmit} resetOnSubmit schema={schema}>
                                <Input 
                                    icon={EnvelopeSimple} 
                                    placeholder='E-mail'
                                    type='text'
                                    // valueChanged={setEmail}
                                    registerName='email'
                                />
                               
                                <Input 
                                    icon={LockSimple} 
                                    placeholder='Senha' 
                                    type='password'
                                    notShowWhen={mode === 'reset'}
                                    // valueChanged={setPassword}
                                    registerName='password'
                                />
                               
                                <Input 
                                    icon={LockSimple} 
                                    placeholder='Confirme a senha' 
                                    type='password'
                                    //valueChanged={setPasswordConfirm}
                                    notShowWhen={mode === 'login' || mode === 'reset'}
                                    registerName='passwordConfirm'
                                />
                                 


                                <span className='dark:text-saira-yellow 
                                                 text-brandPink-500 
                                                 mt-1 
                                                 w-full
                                                 hover:brightness-125
                                                 duration-200
                                '>
                                    <a onClick={() => setMode('reset')} className='cursor-pointer'>{mode==='login' ? 'Esqueci minha senha' : ''}</a>   
                                </span>

                                <button type='submit' className='mt-6 
                                                w-full 
                                                bg-saira-blue 
                                                text-white
                                                font-bold
                                                rounded-sm
                                                h-12
                                                hover:brightness-110
                                                duration-200'
                                >
                                    {mode==='login' ? 'ENTRAR' : mode==='signup' ? 'CADASTRAR' : 'ENVIAR LINK DE REDEFINIÇÃO DE SENHA'}
                                </button>
                                <div className='mt-5'>
                                    <span className='dark:text-zinc-300 text-zinc-700'>
                                        {mode==='login' ? 'Não tem uma conta?' : 
                                        mode === 'signup' ? 'Já tem cadastro?' : 'Já redefiniu a senha?'}  
                                        <a className='dark:text-saira-yellow 
                                                      text-brandPink-500 
                                                      font-semibold
                                                      hover:brightness-125
                                                      duration-200
                                                      cursor-pointer'
                                                      
                                            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                            
                                         >
                                             {' '} {mode === 'login' ? 'Registre-se' : 'Ir para o Login'}
                                         </a> 
                                    </span>
                                </div>

                        </Form>

                    

                    </div>

                </div>

            </div>


        
        
        
        
        
            }


        </div>

       
    )


   
}





