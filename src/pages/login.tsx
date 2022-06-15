

import { EnvelopeSimple, LockSimple } from 'phosphor-react';
import { useState } from 'react';
import { Input } from '../components/Input';
import useAppData from '../data/hook/useAppData';

export default function Login() {
    const { tema, alternarTema, menuIndex} = useAppData()

    const [colorIcon, setColorIcon] = useState('#fff');

    

    return (


        <div className={`${tema} min-h-screen`}>


            <div className='dark:bg-zinc-900 bg-zinc-100 min-h-screen flex flex-col items-center justify-center p-2'>
                <div>
                    <img className='mb-4' src="/images/logo.png" alt="Instituto Saíra" />
                    <span>Faça seu Login</span>
                </div>
                <div className='dark:bg-zinc-800 bg-zinc-300 w-full p-2 sm:w-96'>
                    <form>

                            <Input icon={EnvelopeSimple} placeholder='E-mail'/>
                            <Input icon={LockSimple} placeholder='Senha' type='password'/>

                            <span>
                                Esqueci minha senha
                            </span>
                            <button>Entrar</button>
                            <div>
                                <span>Não tem conta?</span>
                                <span>Registre-se</span>
                            </div>
                    </form>
                </div>
            </div>

        </div>

       
    )


   
}