

import { EnvelopeSimple, LockSimple } from 'phosphor-react';
import { useState } from 'react';
import { Input } from '../components/Input';
import useAppData from '../data/hook/useAppData';

export default function Login() {
    const { tema, alternarTema, menuIndex} = useAppData()

    const [colorIcon, setColorIcon] = useState('#fff');

    

    return (


        <div className={`${tema} min-h-screen`}>

            <div className=' min-h-screen flex flex-col'>
                
                <div>
                    <img className='mb-4' src="/images/logo.png" alt="Instituto Saíra" />
                </div>
                

                <div className='flex flex-col items-center justify-center p-2 dark:bg-zinc-900 bg-zinc-100 flex-1'>
                
               
                <p className='text-zinc-300 font-semibold text-4xl'>Faça o Login ;)</p>
               
                <div className='dark:bg-zinc-800 bg-zinc-300 w-full p-10 rounded-sm sm:w-[30rem]'>
                    <form className='flex flex-col items-center'>

                            <Input icon={EnvelopeSimple} placeholder='E-mail'/>
                            <Input icon={LockSimple} placeholder='Senha' type='password'/>

                            <span className='text-saira-blue mt-1 w-full'>
                                <a href="http://">Esqueci minha senha</a>   
                            </span>
                            <button className='mt-6 
                                               w-full 
                                               bg-saira-blue 
                                               text-white
                                               font-bold
                                               rounded-sm
                                               h-12'
                            >
                                ENTRAR
                            </button>
                            <div>
                                <span>Não tem conta? 
                                    <a href="http://">Registre-se</a> 
                                </span>
                            </div>
                    </form>
                </div>
            </div>







            </div>

            


           

        </div>

       
    )


   
}