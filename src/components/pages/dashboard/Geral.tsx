
import { UserNormalized } from "../../../model/User";
import { SimpleCard } from "./components/SimpleCard"

type GeralProps = {
  user: UserNormalized
}

export default function Geral({user}:GeralProps) {

        console.log(user);
        return (
    
        <>

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
             Se quiser se apresentar, você pode atualizar seus danos em perfil." />  
          }
        
          { user.associated ? null :
            <SimpleCard title="Se associe ao Instituto" text="Vai ser muito bom ter você como membro formal. Assim, nos fortalecemos e você terá direito de participar das decisões estratégias :)" />
          }
          
          <SimpleCard title="Envie sua sugestão" text="Eu sou uma plataforma que ainda está sendo construída e toda a ajuda é bem vinda para me deixar bem legal e inteligente..." />


        </div>


{/* 
                    <div className='bg-zinc-800 p-6 mb-8 rounded-md shadow-sm shadow-brandBlue-500' >
                          <p>A idéia é reunir aqui as pessoas associadas e parceiras do Instituto, as informações e funcionalidades sobre a governança,
                            sobre os projetos, atividades e círculos, além de tudo o mais que quisermos : )
                          </p>
                    </div> */}
                   
              </>  
        )
              
}