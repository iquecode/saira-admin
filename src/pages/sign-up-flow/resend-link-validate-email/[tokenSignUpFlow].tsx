import { useEffect, useState } from 'react';
import ContainerTransactionEmailPages from '../../../components/template/IsolatePagesContainers/ContainerTransactionsEmailPages';
import { api } from '../../../services/api';
import { useQuery } from '../../../util/util';;
import route from "next/router";




export default function ResendLinkValidateEmail() {
    const query = useQuery();
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tokenEmailVerifyExpiration, setTokenEmailVerifyExpiration] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [tokenSignUpFlowState, setTokenSignUpFlowState] = useState<string | string[]>('');

    useEffect( () => {

       
        if (!query) {
            return;
        }
        const {tokenSignUpFlow} = query; 
        setTokenSignUpFlowState(tokenSignUpFlow);
        console.log('Query existe', tokenSignUpFlow);
       
        api.post('auth/sign-up-flow-autorization', {
            tokenSignUpFlow
        }).then((resp)=>{
            setEmail(resp.data.email);
            setTokenEmailVerifyExpiration(resp.data.tokenEmailVerifyExpiration);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        });

    }, [query]);


    async function handleResendLink() {
        //api para reenviar link ... 
        // a api deve redefinir token de verificação de email com expiração nova
        // passar  tokenSignUpFlow   para a api
        const response = await api.post('auth/resend-link-email-validate', {
            tokenSignUpFlow:tokenSignUpFlowState,
        });
        console.log('**response.data.tokenSignUpFlow = ' + response.data.tokenSignUpFlow);
        console.log('**response.data.error = ' + response.data.error);
        if (response.data.tokenSignUpFlow) {
            route.push('/sign-up-flow/sign-up-before-validate-email/' + response.data.tokenSignUpFlow);
        } 
        if (response.data.error) {
            setEmail(null);
            setError('Ocorreu um erro inesperado na tentativa de validação :/. Tente fazer login novamente.')
        }
    }
    

    return (


        <ContainerTransactionEmailPages>

            <div className='dark:bg-zinc-800 bg-zinc-200 w-full xl:w-2/3 p-2 sm:p-10 rounded-sm text-brandBlue-500'>
                       
               {/* <h1>{token}</h1>  */}
               {email? 
                    <div className='text-lg text-center font-mono w-full flex flex-col items-center'>
                        <p className='py-2 font-semibold'>Olá :).</p> 
                        <p className='py-2'>Sua conta foi criada, mas ainda está pendente de validação.</p>
                        <p className='py-2'>Se você não recebeu o email com o Link de ativação ou se o Link já expirou, clique
                            no botão abaixo para confirmar o reenvio de um novo Link de ativação para a sua conta.
                        </p>

                        <p className='pt-10 font-semibold hover:brightness-125 cursor-pointer'>
                          
                            <button onClick={()=>handleResendLink()}>
                                    <a>Reenviar link de ativação</a>
                            </button>
                            
                        </p>
                    </div>
                : 
                
                !loading?
                <p>Ops...{' '} { error ? error : 'Esse link não é mais válido...'}</p>
                :<p>... Espere um pouquinho... o sistema está carregando as informações...</p>
            
            }
                
            </div>
         
        </ContainerTransactionEmailPages>


      
    )
    
}

