import Layout from "../components/template/Layout";

export default function Governance() {


    return (
        <Layout 
            titulo='Governança' 
            subtitulo='Informações sobre os projetos!'
            
        >
            <div className='dark:text-zinc-300'>
                <p>Detalhes da governança do instituto.</p>
                <p>Link para área dos documentos - estatuto - prestação de contas - regimentos - atas.</p>
                <p>Lista dos Círuclos e membros.</p>
                <p>Link para área/app dos Círculos.</p>
            </div>
            
        </Layout>
    )
}