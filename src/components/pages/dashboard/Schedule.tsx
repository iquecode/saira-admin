import { UserNormalized } from "../../../model/User"

type SheduleProps = {
    user: UserNormalized
  }


export default function Schedule({user}:SheduleProps) {

    return (

    <>
                <div className='bg-zinc-800 p-6 rounded-md mb-8 border-zinc-100 border-solid border-2'>
                    
                    <p>Agenda de {user.email}</p>
                    <p>Eventos? Reuniões?...</p>
                </div>
               
          </>  
    )
          
}