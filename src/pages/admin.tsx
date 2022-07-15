import Layout from "../components/template/Layout";

export default function Admin() {


    return (
        <Layout 
            titulo='Área da Gestão' 
            subtitulo='Área de gestão'
            page='admin'
            
        >
            <div className='dark:text-zinc-300'>
                <p>Área do Círculo Gestor.</p>
                <p>Gestão.</p>
               
            </div>
            
        </Layout>
    )
}