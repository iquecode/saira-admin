import { useEffect, useState } from 'react';
import ContainerTransactionEmailPages from '../../../components/template/IsolatePagesContainers/ContainerTransactionsEmailPages';
import { api } from '../../../services/api';
import { useQuery } from '../../../util/util';;
import route from "next/router";
import { client } from '../../api/lib/prisma/client';




export default function ResetPassword({tokenResetPassword}) {
    const query = useQuery();
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tokenEmailVerifyExpiration, setTokenEmailVerifyExpiration] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [tokenSignUpFlowState, setTokenSignUpFlowState] = useState<string | string[]>('');

    // useEffect( () => {

       
    //     if (!query) {
    //         return;
    //     }
    //     const {tokenSignUpFlow} = query; 
    //     setTokenSignUpFlowState(tokenSignUpFlow);
    //     console.log('Query existe', tokenSignUpFlow);
       
    //     api.post('auth/sign-up-flow-autorization', {
    //         tokenSignUpFlow
    //     }).then((resp)=>{
    //         setEmail(resp.data.email);
    //         setTokenEmailVerifyExpiration(resp.data.tokenEmailVerifyExpiration);
    //         setLoading(false);
    //     })
    //     .catch(error => {
    //         setLoading(false);
    //         console.log(error);
    //     });

    // }, [query]);


    

    return (


        <ContainerTransactionEmailPages>

            <div className='dark:bg-zinc-800 bg-zinc-200 w-full xl:w-2/3 p-2 sm:p-10 rounded-sm text-brandBlue-500'>
                       
               <h1>{tokenResetPassword}</h1> 
              
               
            
            
                
            </div>
         
        </ContainerTransactionEmailPages>


      
    )
    
}






export async function getServerSideProps({params}) {
    
    const { tokenResetPassword } = params;


    let email = null;
    try {
        const user = await client.user.findUnique({
            where: {
                tokenResetPassword,
            }
        });
        if (user) {
            
        }
    } catch (error) {
        
    }

    

    

    




    
    return {
      props: { tokenResetPassword }, // will be passed to the page component as props
    }
  }
  