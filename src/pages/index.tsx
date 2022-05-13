import Layout from '../components/template/Layout'

export default function Home() {
  return (
    <Layout titulo='Seu painel' subtitulo='template em construção'>
      <div className='dark:text-zinc-300'>
                <p>Dashborad, infos resumidas e links.</p>
                <p>Informação se é associado ao instituto ou não... caso não seja, link para form associação</p>
                <p>Possibilidade de doar - recorrente ou uma vez</p>
                <p>Informações sobre Tokens Saira do usuário</p>
            </div>   
    </Layout>

  )
}
