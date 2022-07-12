import { UserNormalized } from "../../../../model/User"



type NotesProps = {
    user: UserNormalized
  }


export default function Security({user}:NotesProps) {
       
    return (

    <>
        <h1>Segurança - Em construção</h1>

        *botão para receber email para redefinição de senha
        *lista com os dispositivos conectados, possibilitando deslogar
   
    </>  
    )
          
}