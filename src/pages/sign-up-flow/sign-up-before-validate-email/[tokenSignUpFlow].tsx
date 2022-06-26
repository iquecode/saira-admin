import { useEffect, useState } from 'react';
import ContainerTransactionEmailPages from '../../../components/template/IsolatePagesContainers/ContainerTransactionsEmailPages';
import { api } from '../../../services/api';
import { useQuery } from '../../../util/util';
import Link from 'next/link';


export default function SignUpBeforeValidateEmail() {
    const query = useQuery();
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {

       
        if (!query) {
            return;
        }
        const {tokenSignUpFlow} = query; 
        console.log('Query existe', tokenSignUpFlow);
       
        api.post('auth/sign-up-flow-autorization', {
            tokenSignUpFlow
        }).then((resp)=>{
            setEmail(resp.data.email);
            setLoading(false);
        });

    }, [query]);

    return (


        <ContainerTransactionEmailPages>

            <div className='dark:bg-zinc-800 bg-zinc-200 w-full xl:w-2/3 p-2 sm:p-10 rounded-sm text-brandBlue-500'>
                       
               {/* <h1>{token}</h1>  */}
               {email? 
                    <div className='text-lg text-center font-mono w-full flex flex-col items-center'>
                        <p className='py-2 font-semibold'>Que legal! A sua conta foi criada e agora falta apenas você a validar.</p> 
                        <p className='py-2'>O processo é muito simples e é para a sua segurança.</p>
                        <p className='py-2'>Enviamos um email, para
                            <span className='font-semibold text-brandOrange-400'>  {' '}{email}</span>
                            , com o link para a ativação.
                        </p>
                        <p className='py-2'>Se você não recebeu o email ainda, verifique a sua caixa de Span.</p>
                        <p className='py-8'>Caso queira um reenvio do link, proceda como se fosse fazer o login na plataforma, digitando seu email e senha.</p>
                        <p className='py-2'>Em caso de dúvidas, mande um email para institutosaira@gmail.com.</p>
                        <p className='pt-10 font-semibold hover:brightness-125 cursor-pointer'>
                            <Link href="/">
                                <a>Clique aqui para ir ao login</a>
                            </Link>   
                        </p>
                    </div>
                : 
                
                !loading?
                <p>Ops. Esse link não é mais válido...</p>
                :<p>... Espere um pouquinho... o sistema está carregando as informações...</p>
            
            }
                
            </div>
         
        </ContainerTransactionEmailPages>


      
    )
    
}

