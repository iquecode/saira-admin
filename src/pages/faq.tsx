import Layout from "../components/template/Layout";

export default function Projects() {


    return (
        <Layout 
            title='Perguntas e Respostas' 
            subtitle='Informações sobre os projetos!'
            page = 'faq'
            
        >
            <div className='dark:text-zinc-300'>
                <p>Perguntas e respostas das dúvidas mais comuns.</p>
            </div>
            
        </Layout>
    )
}