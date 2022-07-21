import Layout from "../../components/template/Layout";
import { adminNav } from '../../components/template/Header/navs'

export default function Circles() {


    return (
        <Layout 
            title='Círculos' 
            page = 'admin/circles'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Círculos...</p>

             

            </div>
            
        </Layout>
    )
}