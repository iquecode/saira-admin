
/*

Se você está acessando esta plataforma já demosntra engajamento, de alguma forma, com as atividades do Instituto.

Então, será muito bom ter você como uma pessoa associada.

Não há custo financeiro para a associação e nem obrigação de ajuda financeira dos membros associados ao instituto.

Como membro associado, você tem voz nas decisões e espera-se que possa contribuir de alguma forma para a intervenção na realizadade proposta por nó<s className="

O processo de associação é feito pela plataforma e segue estes passos:

1. Você assume o compromisso com os principios fudamentais e demais disposições estatutárias.
2. Você preenche os dados requeridos e envie submete seu pedido de associação
3. O Círculo Gestor Analisa o pedido e o defere se estiver tudo ok.

Então : ). Vamos começar.

Clique aqui para iniciar o processo.


Pedido de associação

Para se associar ao institututo, você deve assumir o compromisso com os princípios fundamentais e
demais disposições estatutárias e solicitar a associação por meio desta plataforma.

Você pode verificar o estatuto, na íntegra aqui.







*/

import { useState } from "react"
import { UserNormalized } from "../../../../model/User"
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";


type AssocieteProps = {
    user: UserNormalized
  }
export default function Associate({user}:AssocieteProps) {

    const [currentStep, setCurrentStep] = useState<number>(0);
    const steps = [ <Step0 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step1 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step2 user={user} setCurrentStep={setCurrentStep}/>,
                    <Step3 user={user} setCurrentStep={setCurrentStep}/>];

       
    return (
    <>
       {steps[currentStep]}
    </>  
    )
          
}

