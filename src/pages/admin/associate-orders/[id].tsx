import Layout from "../../../components/template/Layout";
import { adminNav } from '../../../components/template/Header/navs'
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { DataGrid } from "../../../components/DataGrid";
import route from "next/router";
import { useRouter } from 'next/router'

export default function Order() {
    
    useEffect (() => {},[]);

    const router = useRouter()
    const { id } = router.query

    return (
        <Layout 
            title={`Pedido de associação - id: ${id}`}
            page = 'admin/associate-orders'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Pedido de associação: {id}</p>

               

            </div>
            
        </Layout>
    )
}
  