import { UserNormalized } from "../../../model/User"

type SheduleProps = {
    user: UserNormalized
  }


export default function Schedule({user}:SheduleProps) {

    return (

    <>
                
                    <p>Em construção...</p>
                    <p>Agenda de {user.email}</p>
                    <p>Eventos? Reuniões?...</p>
                
               
          </>  
    )
          
}