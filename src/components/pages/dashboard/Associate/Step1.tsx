/*

Art6
O INSTITUTO tem por principios fundamentais: 
a. Veganismo Abolicionista como ideologia, entendendo-se que toda a forma de vida animal 
senciente não humana têm os mesmos direitos que os humanos de viver plenamente e de ter 
suas necessidades atendidas em nosso planeta; 

b. Autonomia, autogestão e horizontalidade no poder decisório, baseando a Gestão Social do 
INSTITUTO na modelo de Sociocracia elou em modelos similares que venham a ser aperfeiçoados; 

c. Sustentabilidade e integração com a natureza, conforme descrito no Parágrafo Único, 
item iii, do Art. 5o. 

d. Solidariedade, empatia e senso de comunidade, com o uso de ferramentas que busquem a lógica 
restaurativa em relação aos conflitos, com compaixão empatia e o princípio da não violência; 

Parágrafo Único - O princípio do veganismo abolicionista, descrito no item a., leva a uma 
concepção não antropocêntrica (humanos não têm maior valor do que as outras formas de vidas 
animais), não utilitarista (o sofrimento de alguns indivíduos animais não se justifica pelo 
bem estar da maioria) e anti especista. 



Art. 7o
O INSTITUTO será constituído por associadas que assumem compromisso com os princípios 
fundamentais do INSTITUTO e com as demais disposições estatutárias e regimentais. 
a) São consideradas associadas as pessoas físicas, no gozo de seus direitos civis, que tiverem 
seu pedido de associação aprovado pelo Círculo Gestor ou como dispuser o Regimento Interno, 
tendo direito a participar dos processos decisórios, podendo assumir posições nas instâncias 
de Gestão do INSTITUTO. 

Parágrafo Primeiro - O compromisso com o princípio do veganismo abolicionista, descrito no 
item a. do artigo anterior, implica que nos eventos, projetos, sedes e ambientes coletivos 
gestados pelo Instituto não haverá o uso, consumo ou processos e procedimentos que utilizem 
ou que envolvam, direta ou indiretamente, o sofrimento elou a exploração animal. 

Parágrafo Segundo - Pessoas que não se consideram veganas são bem vindas a se associar ao 
Instituto, contanto que haja respeito ao estipulado no parágrafo anterior. 





*/


import { Dispatch, SetStateAction } from "react"
import { UserNormalized } from "../../../../model/User"

type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
  }
export default function Step1({user, setCurrentStep}:AssocieteProps) {

   
    return (

    <>


        <p className="text-brandBlue-500 font-bold p-4">1. Assumir compromisso com os princípios fundamentais.</p>
      
        <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
        


            <div className="mt-6">
            <p>Conforme disposição estatutária, para se associar ao Instituto, você deve assumir compromisso com os princípios fudamentais, que são, resumidamente:
            </p>
            
            <p className="font-bold text-brandGreen-500">
            a. Veganismo abolicionista, b. Autonomia, autogestão e horizontalidade no poder decisório, c. Sustentabilidade e integração com a natureza e d. Solidariedade, empatia e senso de comunidade.
            </p>
            <p className="mt-4 mb-4">
                Tais princípios carregam consigo um significado simbólico, da formação do Instituto e são norteadores para as atividades e projetos.
            </p>
            <p className="font-bold">
                Importante dizer que o princípio do veganismo abolicionista, assim como os demais, se aplicam, como dito, de forma norteadora para as atividades e projetos,
                sendo que, por ex., <span className="text-brandGreen-500">pessoas que não se consideram veganas podem se associar normalmente, contando que assumam o compromisso de respeitar 
                tais valores nas atividades do Instituto.</span>
            </p>

            <p className="mt-6 mb-4 hover:brightness-150">
                <a href="https://drive.google.com/file/d/1qHar149iAARt3Zzwboq90hjo24nAbURs/view?usp=sharing" target='_blanck'>
                Se quiser ler o estatuto na íntegra, clique aqui para baixar o PDF.
                </a>
               
            </p>
            <p className="mb-4 font-bold">
                Abaixo, o texto completo dos princípios fundamentais e da associação:
            </p>

            <blockquote className="mt-4 text-base">
                Art. 6º.<br/>
                O INSTITUTO tem por principios fundamentais:<br/>
                a. Veganismo Abolicionista como ideologia, entendendo-se que toda a forma de vida animal 
                senciente não humana têm os mesmos direitos que os humanos de viver plenamente e de ter 
                suas necessidades atendidas em nosso planeta;<br/> 

                b. Autonomia, autogestão e horizontalidade no poder decisório, baseando a Gestão Social do 
                INSTITUTO na modelo de Sociocracia elou em modelos similares que venham a ser aperfeiçoados;<br/> 

                c. Sustentabilidade e integração com a natureza, conforme descrito no Parágrafo Único, 
                item iii, do Art. 5o.<br/> 

                d. Solidariedade, empatia e senso de comunidade, com o uso de ferramentas que busquem a lógica 
                restaurativa em relação aos conflitos, com compaixão empatia e o princípio da não violência;<br/> 

                Parágrafo Único - O princípio do veganismo abolicionista, descrito no item a., leva a uma 
                concepção não antropocêntrica (humanos não têm maior valor do que as outras formas de vidas 
                animais), não utilitarista (o sofrimento de alguns indivíduos animais não se justifica pelo 
                bem estar da maioria) e anti especista.<br/><br/>

                Art. 7o<br/>
                O INSTITUTO será constituído por associadas que assumem compromisso com os princípios 
                fundamentais do INSTITUTO e com as demais disposições estatutárias e regimentais.<br/> 
                a) São consideradas associadas as pessoas físicas, no gozo de seus direitos civis, que tiverem 
                seu pedido de associação aprovado pelo Círculo Gestor ou como dispuser o Regimento Interno, 
                tendo direito a participar dos processos decisórios, podendo assumir posições nas instâncias 
                de Gestão do INSTITUTO.<br/>

                Parágrafo Primeiro - O compromisso com o princípio do veganismo abolicionista, descrito no 
                item a. do artigo anterior, implica que nos eventos, projetos, sedes e ambientes coletivos 
                gestados pelo Instituto não haverá o uso, consumo ou processos e procedimentos que utilizem 
                ou que envolvam, direta ou indiretamente, o sofrimento elou a exploração animal.<br/>

                Parágrafo Segundo - Pessoas que não se consideram veganas são bem vindas a se associar ao 
                Instituto, contanto que haja respeito ao estipulado no parágrafo anterior. 
            </blockquote>
                
            </div>


            
            <p className="mt-8 mb-8 font-semibold">Vamos continuar? : )</p>
            
            <div className="flex w-full justify-center gap-4">
                <button className="bg-red-400 
                                    p-3 hover:brightness-110 
                                    duration-200 
                                    rounded-sm 
                                    w-full 
                                    md:w-1/2 
                                    text-white 
                                    text-base
                                    font-bold"
                                    
                        onClick={()=>setCurrentStep(0)}
                >
                        NÃO QUERO ME ASSOCIAR AGORA
                </button>
                <button className="bg-brandGreen-500
                                    p-3 hover:brightness-110 
                                    duration-200 
                                    rounded-sm 
                                    w-full 
                                    md:w-1/2 
                                    text-white 
                                    text-base
                                    font-bold"
                                    
                        onClick={()=>setCurrentStep(2)}
                >
                        SIM, ASSUMO O COPROMISSO COM OS PRINCÍPIOS FUNDAMENTAIS E DISPOSIÇÕES ESTATUTÁRIAS
                </button>
            </div>
        </div>
    </>  
    )
          
}

