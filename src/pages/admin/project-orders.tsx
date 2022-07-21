import Layout from "../../components/template/Layout";
import { adminNav } from '../../components/template/Header/navs'

export default function ProjectOrders() {


    return (
        <Layout 
            title='Projetos submetidos' 
            page = 'admin/project-orders'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Projetos submetidos...</p>

             

            </div>
            
        </Layout>
    )
}