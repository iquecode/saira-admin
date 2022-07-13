
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserNormalized } from "../../../model/User";
import { SimpleCard } from "./components/SimpleCard"
import { UserOrder } from "@prisma/client";

type GeralProps = {
  user: UserNormalized,
  orderAssociateStatus: string,
  setCurrent: Dispatch<SetStateAction<number>>;
}

export default function Geral({user, orderAssociateStatus, setCurrent}:GeralProps) {

        //console.log(user);
        return (
    
        <>

        {!user.email ? null :


<div className="w-full flex flex-col sm:flex-row flex-wrap gap-8">

          
{ user.name||user.socialName||user.nickname ? 
  <div className="w-full">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-200">
      Olá {user.nickname ? user.nickname : user.socialName ? user.socialName : user.name + ':)'},
    </h5>
    <p>
      Que bom ver você aqui novamente : ).
    </p>
  </div>
: 
   <SimpleCard title={`Olá ${user.email} :)`} text="...bom, chamei você pelo seu email, pois não sei seu nome hehe.
   Se quiser se apresentar, você pode atualizar seus danos em perfil."
               action={()=>setCurrent(6)}  
   />  
}

{ !user.associated && !orderAssociateStatus ?
  <SimpleCard title="Se associe ao Instituto" 
              text="Vai ser muito bom ter você como membro formal. Assim, nos fortalecemos e você terá direito de participar das decisões estratégias :)" 
              action={()=>setCurrent(3)}          
  />
  : 
  null
}

{ !user.associated && orderAssociateStatus=='pendency' ?
  <SimpleCard title="Pendência..." text="Existe pendência no seu pedido de associação ao instituto. Verifique..."
              action={()=>setCurrent(3)}  
  />
              
  : 
  null
}

<SimpleCard title="Envie sua sugestão" text="Eu sou uma plataforma que ainda está sendo construída e toda a ajuda é bem vinda para me deixar bem legal e inteligente..."
            action={()=>setCurrent(4)}  
/>


</div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        }

      

                   
              </>  
        )
              
}