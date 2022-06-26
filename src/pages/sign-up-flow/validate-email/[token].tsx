import { useEffect, useState } from 'react';
import ContainerTransactionEmailPages from '../../../components/template/IsolatePagesContainers/ContainerTransactionsEmailPages';
import { api } from '../../../services/api';
import { useQuery } from '../../../util/util';
import Link from 'next/link';


export default function EmailValidation() {
    const query = useQuery();
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {

       
        if (!query) {
            return;
        }
        const {token} = query; 
        console.log('Query existe', token);
       
        api.post('auth/validate-email', {
            token
        }).then((resp)=>{
            setEmail(resp.data.email);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        });

    }, [query]);

    return (


        <ContainerTransactionEmailPages>

            <div className='dark:bg-zinc-800 bg-zinc-200 w-full xl:w-2/3 p-2 sm:p-10 rounded-sm text-brandBlue-500'>
                       
               {/* <h1>{token}</h1>  */}
               {email? 
                    <div className='text-xl font-mono w-full flex flex-col items-center'>
                        <p className='py-2'>Ebaaa ;). A sua conta foi validada.</p> 
                        <p className='py-2'>Você já pode se logar na plataforma, utilizando o email 
                            <span className='font-semibold text-brandOrange-400'>  {' '}{email}</span>
                            , junto com a senha que você cadastrou.
                        </p>
                        <p className='pt-10 font-semibold hover:brightness-125 cursor-pointer'>
                            <Link href="/">
                                <a>Clique aqui para ir ao login</a>
                            </Link>   
                        </p>
                    </div>
                : 
                
                !loading?
                <p>Ops. Esse link não é mais válido...</p>
                :<p>... Espere um pouquinho... sua conta está sendo validada...</p>
            
            }
                
            </div>
         
        </ContainerTransactionEmailPages>


      
    )
    
}

