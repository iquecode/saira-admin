
/*

Se você está acessando esta plataforma já demosntra engajamento, de alguma forma, com as atividades do Instituto.

Então, será muito bom ter você como uma pessoa associada.

Não há custo financeiro para a associação e nem obrigação de ajuda financeira dos membros associados ao instituto.

Como membro associado, você tem voz nas decisões e espera-se que possa contribuir de alguma forma para a intervenção na realizadade proposta por nó<s className="

O processo de associação é feito pela plataforma e segue estes passos:

1. Você assume o compromisso com os principios fudamentais e demais disposições estatutárias
2. Você envia foto de seu documento (identidade, CNH ou Passaporte)
3. Você preenche os demais dados requeridos
4. O Círculo Gestor Analisa o pedido e o defere se estiver tudo ok.

Então : ). Vamos começar.

Clique aqui para iniciar o processo.


Pedido de associação

Para se associar ao institututo, você deve assumir o compromisso com os princípios fundamentais e
demais disposições estatutárias e solicitar a associação por meio desta plataforma.

Você pode verificar o estatuto, na íntegra aqui.



*/

import { UserOrder } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UserNormalized } from "../../../../model/User"
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5Pendency from "./Step5Pendency";
import Step6Accept from "./Step6Accept";
import Step7Denied from "./Step7Denied";


type AssocieteProps = {
    user: UserNormalized
    orderAssociateStatus: string
    setOrderAssociateStatus: Dispatch<SetStateAction<string>>
  }
export default function Associate({user, orderAssociateStatus, setOrderAssociateStatus}:AssocieteProps) {

    const [currentStep, setCurrentStep] = useState<number>(-1);
    const steps = [ <Step0 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step1 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step2 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step3 user={user} setCurrentStep={setCurrentStep} setOrderAssociateStatus={setOrderAssociateStatus}/>,
                    <Step4 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step5Pendency user={user} setCurrentStep={setCurrentStep}/>,
                    <Step6Accept user={user} setCurrentStep={setCurrentStep}/>,
                    <Step7Denied user={user} setCurrentStep={setCurrentStep}/>
                  ];


    useEffect( () => {
     
     
      switch (orderAssociateStatus) {
        case 'created':
        case 'under-debat':
          setCurrentStep(4);
          break;
        case 'pendency':
          setCurrentStep(5);
          break;
        case 'accept':
          setCurrentStep(6);
          break;
        case 'denied':
          setCurrentStep(7);
          break;
        default:
          setCurrentStep(0);
          break;
      }
    }, []);

       
    return (
    <>
       { user.associated ? <h1>Você já é associada/o ao Instituto. : )</h1> : null }
       {currentStep>=0 && !user.associated ? steps[currentStep] : null } 
    </>  
    )
          
}

