import Layout from "../components/template/Layout";

export default function Projects() {


    return (
        <Layout 
            title='Projetos' 
            subtitle='Informações sobre os projetos!'
            page='projects'
            
        >
            <div className='dark:text-zinc-300'>
                <p>Lista dos projetos com link para entrar e ver detalhes.</p>
                <p>Link para submeter novo projeto.</p>
                <p>Possibilidade de doar (uma vez ou recorrente) de forma geral ou para projetos específicos</p>
            </div>
            
        </Layout>
    )
}