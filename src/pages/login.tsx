import { EnvelopeSimple, LockSimple } from 'phosphor-react';
import { Input } from '../components/Input';
import BotaoAlternarTema from '../components/template/BotaoAlternarTema';
import useAppData from '../data/hook/useAppData';

export default function Login() {
    const { tema, alternarTema, menuIndex} = useAppData()


    

    return (


        <div className={`${tema} min-h-screen`}>

            <div className='min-h-screen flex flex-col dark:bg-zinc-900 bg-zinc-300'>
                
                <div className='w-full h-40 flex justify-center items-center dark:bg-zinc-800 bg-zinc-100'>
                    <div className='w-full flex items-center justify-between sm:w-[30rem]'>
                        <img className='mb-4 h-32' src="/images/logo.png" alt="Instituto Saíra" />
                        <BotaoAlternarTema tema={tema} alternarTema={alternarTema}/>
                    </div>
                </div>
                
                <div className='flex flex-col items-center justify-center p-2 mt-24 h-full'>
                    <p className='dark:text-zinc-300 text-zinc-700 font-semibold text-4xl mb-3'>Entre com a sua conta</p>
                   
                    <div className='dark:bg-zinc-800 bg-zinc-200 w-full p-10 rounded-sm sm:w-[30rem]'>
                        <form className='flex flex-col items-center'>
                                <Input icon={EnvelopeSimple} placeholder='E-mail'/>
                                <Input icon={LockSimple} placeholder='Senha' type='password'/>

                                <span className='dark:text-saira-yellow 
                                                 text-brandPink-500 
                                                 mt-1 
                                                 w-full
                                                 hover:brightness-125
                                                 duration-200
                                '>
                                    <a href="http://">Esqueci minha senha</a>   
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
                                    ENTRAR
                                </button>
                                <div className='mt-5'>
                                    <span className='dark:text-zinc-300 text-zinc-700'>Não tem uma conta?  
                                        <a className='dark:text-saira-yellow 
                                                      text-brandPink-500 
                                                      font-semibold
                                                      hover:brightness-125
                                                      duration-200' 
                                            href="http://"
                                         >
                                             {' '}Registre-se
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