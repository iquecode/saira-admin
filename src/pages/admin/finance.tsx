import Layout from "../../components/template/Layout";
import { adminNav } from '../../components/template/Header/navs'

export default function Finance() {


    return (
        <Layout 
            title='Finanças' 
            page = 'admin/finance'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Finanças...</p>

             

            </div>
            
        </Layout>
    )
}