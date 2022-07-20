import Layout from "../components/template/Layout";

export default function Blog() {


    return (
        <Layout 
            title='Blog' 
            subtitle='Informações sobre os projetos!'
            page='blog'
            
        >
            <div className='dark:text-zinc-300'>
                <p>Postagens do blog do site púbblico.</p>
                <p>Possibilidade de criar novas postagens, que alimentarão o banco de dados do blog do site público.</p>
               
            </div>
            
        </Layout>
    )
}