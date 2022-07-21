import Layout from "../../components/template/Layout";
import { adminNav } from '../../components/template/Header/navs'

export default function Users() {


    return (
        <Layout 
            title='Usuários' 
            page = 'admin/users'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Cadastro de usuários</p>

             

            </div>
            
        </Layout>
    )
}