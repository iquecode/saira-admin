import Layout from "../components/template/Layout";

export default function Library() {


    return (
        <Layout 
            titulo='Biblioteca' 
            subtitulo='Informações sobre os projetos!'
            page='library'
            
        >
            <div className='dark:text-zinc-300'>
                <p>Biblioteca com o conteúdo da biblioteca do goodle drive.</p>
            </div>
            
        </Layout>
    )
}