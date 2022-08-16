import Layout from "../../../components/template/Layout";
import { adminNav } from '../../../components/template/Header/navs'
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { DataGrid } from "../../../components/DataGrid";
import route from "next/router";
import { useRouter } from 'next/router'
import { UserNormalized } from "../../../model/User";
import { DocumentsForm } from "../../../components/pages/admin/associate-orders/DocumentsForm";
import { ArrowDown, ArrowUp } from "phosphor-react";
import { InfoForm } from "../../../components/pages/admin/associate-orders/InfoForm";

export default function Order() {


    async function handleConfirmOrderAssociate(userIdFromOrder, orderId ) {
        
        const response = await api.post('model/user-orders/confirm-associate', {
            userIdFromOrder,
            orderId,
        })
        console.log("aprovação associação");
        console.log(response.data);
        
        const {error, message, success, order, user} = response.data;
        //alert('Confirmar pedido de associação ID: ' + id);
    }
    
    useEffect (() => {
        api.post('model/user/get-user', {
            id:'orderid'+id,
        }).
        then(response => (setUser(response.data.user)))
        

    },[]);

    const router = useRouter()
    const { id } = router.query
    const [user, setUser] = useState<null | UserNormalized>(null); 
    const [showDocumentsForm, setShowDocumentsForm] = useState<boolean>(false);
    const [showInfoForm, setShowInfoForm] = useState<boolean>(false);

    return (
        <Layout 
            title={`Pedido de associação - id: ${id}`}
            page = 'admin/associate-orders'
            nav = {adminNav}
            
        >
            <div className='dark:text-zinc-300'>
               
                <div className="w-full bg-white border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300 p-4 rounded">
                    <div className="flex justify-between cursor-pointer" 
                         onClick={()=>setShowDocumentsForm(!showDocumentsForm)}>
                        Documento identificação
                        {showDocumentsForm ? <ArrowUp size={32} /> : <ArrowDown size={32}/>}
                    </div>
                    <div className={`${!showDocumentsForm ? 'hidden' : null}`}>
                        {user ?  <DocumentsForm user={user} /> : null }
                    </div>
                </div>

                <div className="mt-10 w-full bg-white border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300 p-4 rounded">
                    <div className="flex justify-between cursor-pointer" 
                         onClick={()=>setShowInfoForm(!showInfoForm)}>
                        Formulário informações
                        {showInfoForm ? <ArrowUp size={32} /> : <ArrowDown size={32}/>}
                    </div>
                    <div className={`${!showInfoForm ? 'hidden' : null}`}>
                        {user ?  <InfoForm user={user} /> : null }
                    </div>
                </div>

                <button onClick={()=>handleConfirmOrderAssociate(user.id, id)}>
                    Confirmar pedido de associação
                </button>


            </div>
            
        </Layout>
    )
}
  