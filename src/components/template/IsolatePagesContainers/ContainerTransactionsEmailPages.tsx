import useAppData from "../../../data/hook/useAppData";
import BotaoAlternarTema from "../BotaoAlternarTema";

interface ContainerTransactionEmailPagesProps {
    children?: any 
}
  


export default function ContainerTransactionEmailPages({children}:ContainerTransactionEmailPagesProps) {
    
    const { tema, alternarTema, menuIndex} = useAppData()

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
                    {children}
                </div>
            </div>

        </div>

       
    )


   
}





