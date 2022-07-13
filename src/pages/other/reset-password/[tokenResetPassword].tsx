import { useEffect, useRef, useState } from 'react';
import ContainerTransactionEmailPages from '../../../components/template/IsolatePagesContainers/ContainerTransactionsEmailPages';
import { api } from '../../../services/api';
import { useQuery } from '../../../util/util';;
import route from "next/router";
import { client } from '../../api/lib/prisma/client';
import Form from '../../../components/Form';
import { Input } from '../../../components/Input';
import { LockSimple } from 'phosphor-react';
import { appendErrors, SubmitHandler } from 'react-hook-form';
import * as yup from "yup";
import YupPassword from 'yup-password'
YupPassword(yup) // extend yup



import NProgress from 'nprogress';
//import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";

interface IFormInput  {
    tokenResetPassword: string,
    password: string,
  };

  type FormValues = {
    password: string;
    passwordConfirm: string;
    tokenResetPassword: string;
  };


export default function ResetPassword({email, tokenResetPassword}) {


    const [toggleResetForm, setToggleResetForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object(
        {password: yup.string().min(8).max(60).minLowercase(1).minUppercase(1).minNumbers(1).minRepeating(2).required(),
        
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'As senhas não conferem').required()}
    );
    
    
    function setLoading(loading: boolean) {
        setIsLoading(loading);
        if(loading) {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }
   
   
    
    const onSubmit: SubmitHandler<FormValues> = async function(data) {
        setLoading(true);
        return api.post('auth/reset-password',data)
        .then(resp=> {
            //setToggleResetForm(!toggleResetForm);
            setLoading(false);
            alert(resp.data.message);
          
        })
        .catch(error=> {
            //setToggleResetForm(!toggleResetForm);
            NProgress.done();
            alert('erro: ' + error.message);
        })
        //alert(JSON.stringify(data));
    } 
    
    return (

        <ContainerTransactionEmailPages>

            
            {!email ? 
            <div className='dark:bg-zinc-800 bg-zinc-200 w-full xl:w-2/3 p-2 sm:p-10 rounded-sm text-brandBlue-500'>
                       
               <h1>Ops... Esse link não é valido. </h1> 
             </div>

            :

            <div className='flex flex-col items-center justify-center p-2 sm:mt-12 mt-12 sm:flex-none h-full'>
                <p className='dark:text-zinc-300 
                                text-zinc-700 
                                font-semibold 
                                text-4xl 
                                mb-3'
                >
                    Entre com a nova senha
                </p>       
                <p className='dark:text-zinc-300 
                                text-zinc-700 
                                font-semibold 
                                text-lg
                                mb-3
                                mt-7
                                max-w-4xl
                                text-center'
                >
                        {email}
                </p>
                <div className='dark:bg-zinc-800 bg-zinc-200 w-full p-2 sm:p-10 rounded-sm sm:w-[30rem]'>

                    
  
                    <Form className='flex flex-col items-center' onSubmit={onSubmit} resetOnSubmit toggleReset={toggleResetForm} schema={schema}  >
                            
                            <Input 
                                icon={LockSimple} 
                                placeholder='Senha' 
                                type='password'
                                // valueChanged={setPassword}
                                registerName='password'
                            />
                            <Input 
                                icon={LockSimple} 
                                placeholder='Confirme a senha' 
                                type='password'
                                //valueChanged={setPasswordConfirm}
                                registerName='passwordConfirm'
                            />
                            <Input
                                hidden
                                registerName='tokenResetPassword'
                                value={tokenResetPassword}
                            />

                            
                            
                            <button type='submit' className={`mt-6 
                                            w-full 
                                            bg-saira-blue 
                                            text-white
                                            font-bold
                                            rounded-sm
                                            h-12
                                            hover:brightness-110
                                            ${isLoading?'cursor-not-allowed':''}
                                            duration-200`}
                            >
                                REDEFINIR SENHA
                            </button>

                            <div className='mt-5'>
                                <span className='dark:text-zinc-300 text-zinc-700'>
                                    Já redefiniu a senha?  
                                    <a className='dark:text-saira-yellow 
                                                    text-brandPink-500 
                                                    font-semibold
                                                    hover:brightness-125
                                                    duration-200
                                                    cursor-pointer'
                                                    
                                        onClick={() => route.push('/')}
                                        
                                        >
                                            {' '} Ir para o Login
                                        </a> 
                                </span>
                            </div>
                    </Form>
                   
                </div>
            </div> 
            }

        </ContainerTransactionEmailPages>
    )
    
}


export async function getServerSideProps({params}) {
    
    const { tokenResetPassword } = params;

    const duration:number = 60 * 60 * 24 //24 horas;
    const expiration:number = parseInt(tokenResetPassword.split('@@')[0]) + duration;
    console.log('expiration: ' + expiration);
    console.log('now.......: ' + Date.now()/1000);
    if(Math.floor(Date.now()/1000) > expiration) {
        return {
            props: { email:null }, 
          }
    }

    let email:string = null;
    try {
        const user = await client.user.findUnique({
            where: {
                tokenResetPassword,
            }
        });
        if (user) {
            email = user.email;
        }
    } catch (error) {
        
    }
    
    return {
      props: { email,tokenResetPassword }, // will be passed to the page component as props
    }
  }
  