import { Dispatch, SetStateAction } from "react"
import { UserNormalized } from "../../../../model/User"

type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
  }
export default function Step0({user, setCurrentStep}:AssocieteProps) {

   
    return (

    <>


      
        <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
            <p className="mb-3">Cremos que o fato de você estar aqui já é uma demosntração da compatibilidade entre a sua visão com, toda ou parte, da visão de mundo compartilhada no Instituto Saíra.</p>
            <p className="mb-3">Então, será muito bom ter você como uma pessoa associada.</p>
            <p className="mb-3">Não há custo financeiro para a associação e nem obrigação de ajuda financeira estipulada.</p>
            <p className="mb-3">Como membro, você tem voz nas decisões, maior apoio para seus projetos e espera-se que possa contribuir, de alguma forma, para as intervenções na realizadade propostas pelo Instituto.</p>
            <p>O processo de associação é feito pela plataforma e segue estes passos:</p>

            <ul className="ml-8">
                <li>1. Você assume o compromisso com os principios fudamentais e demais disposições estatutárias.</li>
                <li>2. Você preenche os dados requeridos e submete seu pedido de associação.</li>
                <li>3. O Círculo Gestor Analisa o pedido e o defere se estiver tudo ok.</li>
            </ul>
            
            <p className="mt-8 mb-8 font-semibold">Vamos começar? : )</p>
            
            <div className="flex w-full justify-center">
                <button className="bg-brandBlue-500 
                                    p-3 hover:brightness-110 
                                    duration-200 
                                    rounded-sm 
                                    w-full 
                                    md:w-1/2 
                                    text-white 
                                    font-bold"
                                    
                        onClick={()=>setCurrentStep(1)}
                >
                        CLIQUE AQUI PARA SE ASSOCIAR
                </button>
            </div>
        </div>
    </>  
    )
          
}

