import { Dispatch, SetStateAction } from "react"
import { UserNormalized } from "../../../../model/User"

type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
  }
export default function Step5Pendency({user, setCurrentStep}:AssocieteProps) {

   
    return (

    <>


      
        <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
          

            <ul className="ml-8">
                <li>1. Você assume o compromisso com os principios fudamentais e demais disposições estatutárias.</li>
                <li>2. Você preenche os dados requeridos e submete seu pedido de associação.</li>
                <li className="bg-brandGreen-500 font-bold">3. O Círculo Gestor Analisa o pedido e o defere se estiver tudo ok.</li>
            </ul>
            
            <p className="mt-8 mb-8 font-semibold">Vamos continuar? : )</p>
            
            <div className="flex w-full justify-center text-brandOrange-500 font-semibold">
                
                        PENDÊNCIA
            </div>
        </div>
    </>  
    )
          
}