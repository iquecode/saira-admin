import Layout from "../../components/template/Layout";
import { adminNav, standardNav } from '../../components/template/Header/navs'
import { ArrowLeft } from "phosphor-react";
import route from "next/router";

export default function Projects() {


    return (
        <Layout 
            title='Painel de gestão' 
            page = 'admin/dashboard'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Painel de Gestão.</p>

                <button 
                    type="button" 
                    className="font-semibold mt-4 pl-1 pr-3 py-2 inline-flex text-white bg-brandBlue-500 hover:opacity-90 rounded-lg text-sm text-center items-center dark:bg-brandOrange-500"
                    onClick={()=>route.push('/dashboard')}
                    
                >
                    <ArrowLeft  size={32} className="mr-2"/>
                    Voltar à área de usuário
                </button>

            </div>
            
        </Layout>
    )
}