import { LockSimple } from "phosphor-react"
import { Dispatch, SetStateAction } from "react"
import { UserNormalized } from "../../../../model/User"
import Form from "../../../Form"
import { Input } from "../../../Input"


type AssocieteProps = {
    user: UserNormalized
    setCurrentStep:Dispatch<SetStateAction<number>>
  }
export default function Step2({user, setCurrentStep}:AssocieteProps) {

   
    return (

    <>
        <p className="text-brandBlue-500 font-bold p-4">2. Cadastro para submeter o pedido de associação.</p>


      
        <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
          
        <div className="mt-6">
            <p>Precisamos dos dados abaixo, juntamente com uma foto(ou PDF) de seu documento, para submeter seu pedido de associação:
            </p>

            <Form className="flex flex-col">
               
                <Input 
                    placeholder='nome conforme documento'
                    type='text'
                    registerName='name'
                    label='Nome Completo*'
                />
                <Input 
                    placeholder='nome social (não obrigatório)' 
                    type='text'
                    registerName='socialName'
                    label='Nome social'
                />
                <Input 
                    placeholder='como quer ser chamad@?' 
                    type='text'
                    registerName='nickname'
                    label='Como quer ser chamad@?'
                />
                <Input 
                    placeholder='ocupação' 
                    type='text'
                    registerName='occupation'
                    label='profissão / ocupação'
                />
                <Input 
                    placeholder='data de nascimento' 
                    type='date'
                    registerName='birthDay'
                    label='Data nascimento'
                />
                <Input 
                    placeholder='Nome da mãe' 
                    type='text'
                    registerName='motherName'
                    label='Nome da mãe'
                />
                <Input 
                    placeholder='nome do pai' 
                    type='text'
                    registerName='fatherName'
                    label='Nome do pai'
                />
                <Input 
                    placeholder='CPF' 
                    type='text'
                    registerName='cpf'
                    label='CPF'
                />
                <Input 
                    placeholder='Tipo documento identificação' 
                    type='check-box'
                    registerName='documentTypeId'
                    label='tipo do documento'
                />
                <Input 
                    placeholder='Nº documento identificação' 
                    type='check-box'
                    registerName='documentNumber'
                    label='tipo do documento'
                />
                <Input 
                    placeholder='foto documento - frente ou única' 
                    type='text'
                    registerName='documentPhotoURL1'
                    label='Foto frente do documento ou foto única'
                />
                 <Input 
                    placeholder='foto documento - verso' 
                    type='text'
                    registerName='documentPhotoURL2'
                    label='Foto verso do documento'
                />
                <Input 
                    placeholder='Nº documento identificação' 
                    type='check-box'
                    registerName='documentNumber'
                    label='tipo do documento'
                />

                <p>Endereço</p>
                <Input 
                    placeholder='País' 
                    type='text'
                    registerName='countryId'
                    label='país'
                />
                 
                <Input 
                    placeholder='Cep' 
                    type='text'
                    registerName='cep'
                    label='Cep'
                />
                <Input 
                    placeholder='UF' 
                    type='text'
                    registerName='uf'
                    label='UF'
                />
                <Input 
                    placeholder='cidade' 
                    type='text'
                    registerName='city'
                    label='Cidade'
                />
                <Input 
                    placeholder='Endereço - linha 1' 
                    type='text'
                    registerName='addressLine1'
                    label='Endereço - linha1'
                />
                 <Input 
                    placeholder='Endereço - complemento' 
                    type='text'
                    registerName='addressLine2'
                    label='Endereço - complemento'
                />
                <p>Avatar imagem</p>
                 <Input 
                    placeholder='Avatar' 
                    type='text'
                    registerName='avatarURL'
                    label='Endereço - complemento'
                />




                






            </Form>
            
        

        </div>
            
            <p className="mt-8 mb-8 font-semibold">Vamos continuar? : )</p>
            
            <div className="flex w-full justify-center">
                <button className="bg-brandBlue-500 
                                    p-3 hover:brightness-110 
                                    duration-200 
                                    rounded-sm 
                                    w-full 
                                    md:w-1/2 
                                    text-white 
                                    font-bold"
                                    
                        onClick={()=>setCurrentStep(3)}
                >
                        ENVIAR DADOS - IR AO PASSO 3
                </button>
            </div>
        </div>
       
    </>  
    )
          
}

