import { EnvelopeSimple, LockSimple } from 'phosphor-react';
import { useState } from 'react';
import { Input } from '../components/Input';
import BotaoAlternarTema from '../components/template/BotaoAlternarTema';
import useAppData from '../data/hook/useAppData';

export default function Auth() {
    const { tema, alternarTema, menuIndex} = useAppData()
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')


    

    return (


        <div className={`${tema} min-h-screen`}>

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
                        {mode === 'login' ? 'Entre com a sua conta' : 'Crie sua conta'}
                    </p>
                   
                    <div className='dark:bg-zinc-800 bg-zinc-200 w-full p-2 sm:p-10 rounded-sm sm:w-[30rem]'>
                        <form className='flex flex-col items-center'>
                                <Input 
                                    icon={EnvelopeSimple} 
                                    placeholder='E-mail'
                                    type='email'
                                    valueChanged={setEmail}
                                />
                                <Input 
                                    icon={LockSimple} 
                                    placeholder='Senha' 
                                    type='password'
                                    valueChanged={setPassword}
                                />
                                <Input 
                                    icon={LockSimple} 
                                    placeholder='Confirme a senha' 
                                    type='password'
                                    valueChanged={setPasswordConfirm}
                                    notShowWhen={mode === 'login'}
                                />

                                <span className='dark:text-saira-yellow 
                                                 text-brandPink-500 
                                                 mt-1 
                                                 w-full
                                                 hover:brightness-125
                                                 duration-200
                                '>
                                    <a href="http://">{mode==='login' ? 'Esqueci minha senha' : ''}</a>   
                                </span>
                                <button className='mt-6 
                                                w-full 
                                                bg-saira-blue 
                                                text-white
                                                font-bold
                                                rounded-sm
                                                h-12
                                                hover:brightness-110
                                                duration-200'
                                >
                                    {mode==='login' ? 'ENTRAR' : 'CADASTRAR'}
                                </button>
                                <div className='mt-5'>
                                    <span className='dark:text-zinc-300 text-zinc-700'>
                                        {mode==='login' ? 'Não tem uma conta?' : 'Já tem cadastro?'}  
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
                        </form>
                    </div>

                </div>

            </div>

        </div>

       
    )


   
}