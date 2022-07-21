import Layout from "../../components/template/Layout";
import { adminNav } from '../../components/template/Header/navs'
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { DataGrid } from "../../components/DataGrid";

export default function AssociateOrders() {

    const [orders, setOrders] = useState(null);
    const [total, setTotal] = useState(0);
    const columns = [
        {field: 'id', headerName:'ID'},
        {field: 'email', headerName:'Email'},
        {field: 'name', headerName:'Name'},
        {field: 'status', headerName:'Status'},
        {field: 'createdAt', headerName:'Data'}
    ];

    useEffect (() => {
        api.get('model/user-orders/get-associate-orders', { 
            params: {skip: 0, take: 10}
        })
        .then(response => {
            console.log('### pedidos de associação:');
            console.log(response.data.associateOrders);
            console.log(response.data.total);
            setOrders(response.data.associateOrders);
            setTotal(response.data.total);
        })
        .catch(error=>{
            console.log(error);
        });
    },[]);

    
    // const data = [
    //     {id: '1', brand: 'Apple', color: 'Prata', product: 'Laptop', price: 'R$2.999'},
    //     {id: '2', brand: 'Microsoft', color: 'Preto', product: 'PC', price: 'R$1.999'},
    //     {id: '3', brand: 'Logitec', color: 'Azul', product: 'Mouse', price: 'R$199'},
    // ];

    // function test(id: string) {
    //     alert('Teste - id: ' + id);
    // }



    return (
        <Layout 
            title='Pedidos de associação' 
            page = 'admin/associate-orders'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
                <p>Pedidos de associação</p>

                {orders ?
                    <DataGrid columns={columns} data={orders} action={(id)=>alert('ID: ' + id)} />
                    :
                 null
                }
                

             

            </div>
            
        </Layout>
    )
}
  