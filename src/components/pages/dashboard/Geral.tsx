export default function Geral({user}:any) {

        return (
    
        <>
                    <div className='bg-zinc-800 p-6 rounded-md mb-8 border-zinc-100 border-solid border-2'>
                        <p className='text-xl mb-6 font-semibold' >
                            Olá{' '}{user.nickname? user.nickname 
                              :  user.name? user.name : user.email}
                              {' '} : )
                        </p>
                        {!user.name && !user.nickname ? 
                      <div className='mb-4'>
                          <p>..bom, chamei você pelo seu email, pois não sei seu nome hehe.
                          Se quiser se apresentar, você pode atualizar seus danos em <a className='text-brandOrange-400'>perfil</a>.</p>
                      </div>
                        : null
                        }
                        <p>Eu sou a plataforma - versão beta - do Instituto Saíra e ainda estou sendo construída.</p>
                        <p>Então, toda a ajuda é bem vinda para me deixar bem legal e inteligente : )</p>
                    </div>
                    <div className='bg-zinc-800 p-6 mb-8 rounded-md shadow-sm shadow-brandBlue-500' >
                          <p>A idéia é reunir aqui as pessoas associadas e parceiras do Instituto, as informações e funcionalidades sobre a governança,
                            sobre os projetos, atividades e círculos, além de tudo o mais que quisermos : )
                          </p>
                    </div>
                    { user.circles.filter(circle => circle.name == 'Assembléia Geral').length >= 1 
                      ? 
                        <>
                          Associado
                        </>
                      : 
                        <> 
                          <div className='bg-zinc-800 p-6 hover:bg-zinc-700 rounded-sm shadow-sm shadow-brandPink-500 cursor-pointer' >
                          <p>Você ainda não é pessoa associada do Instituto Ainda e pode participar ter parceria conosco</p>
                          <p>Mas seria muito bom ter você como membro formal. Assim nos fortalecemos e você terá direito de participar das decisões estratégias :)</p>
                          <p>Se quiser, clique neste card para submeter a seu pedido de associação</p>
                          </div>
                        </>
                        }
              </>  
        )
              
}